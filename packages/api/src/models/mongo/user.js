import { hash,compare } from 'bcrypt'
import { Schema,model } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const schema = new Schema({
	name: String,
	lastName: String,
	createAt: Date,
	password: String,
	userName: String,
	type: String,
	disable: Boolean
})

schema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

const User = model('User', schema)

class UserModel {
	async getAll(){
		const users = await User.find()
		return users
	}

	getById = async ({userId}) =>{
		const users = await User.findById(userId)
		if (!users) throw {name: 'INVALID_ID'}
		return users
	}

	login = async ({password, userName})=>{
		const lowerPassword = password.toLowerCase()
		const lowerUserName = userName.toLowerCase()

		const user = await User.findOne({userName:lowerUserName })

		const isCorrectPassword = user
			? await compare(lowerPassword ,user.password)
			: false

		if (!isCorrectPassword) throw {name: 'BAD_LOGIN'}
		else if (user.disable) throw {name: 'INVALID_USER_VALIDATE'}


		const token = jwt.sign({
			userId: user.toJSON().id
		},  process.env.SECRET_KEY)

		
		const usetToSend = {
			...user.toJSON(),
			token
		}

		return usetToSend
	}

	create = async ({name, lastName, password, userName,admin,secret}) =>{
		if (secret !== process.env.SECRET_KEY) throw {name: 'INVALID_SECRET'}
		const isCreated = await User.findOne({ userName })
		if (isCreated) throw { name: 'USER_ALREADY_EXISTS' }
		const date = new Date()

		const lowerPassword = password.toLowerCase()
		const SALT_ROUNDS = 10
		const passwordHash = await bcrypt.hash(lowerPassword, SALT_ROUNDS)

		const lowerName = name.toLowerCase()
		const lowerLastName = lastName.toLowerCase()
		const lowerUserName = userName.toLowerCase()

		const user = new User({
			name: lowerName,
			lastName: lowerLastName,
			createAt: date,
			password: passwordHash,
			userName: lowerUserName,
			type: admin ?'admin':'user',
			disable: false
		})

		const newUser = await user.save()
		return newUser
	}

	async update ({name,lastName, userName,password,userId,disable}){
		const findedUser = await User.findById(userId)
		if (!findedUser) throw {name: 'INVALID_ID'}

		const userNameExists = await User.findOne({userName})
		if (userNameExists &&
    userNameExists._id.toString() !== findedUser._id.toString() ) throw { name: 'USER_ALREADY_EXISTS' }

		const lowerPassword = password.toLowerCase()
		const SALT_ROUNDS = 10
		const passwordHash = await bcrypt.hash(lowerPassword, SALT_ROUNDS)

		const lowerName = name.toLowerCase()
		const lowerLastName = lastName.toLowerCase()
		const lowerUserName = userName.toLowerCase()
    
		const newUser = Object.assign(
			findedUser,
			{
				name:lowerName,
				lastName:lowerLastName, 
				userName: lowerUserName,
				password: passwordHash,
				disable
			}
		)

		const user = await newUser.save()
		return user
	}

	async delete ({userId}){
		const userExitst = await User.findById(userId)
		if (!userExitst) throw {name: 'INVALID_ID'}
		await User.findByIdAndDelete(userId)
		return null
	}
}

export {UserModel}