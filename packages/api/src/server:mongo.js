import 'dotenv/config.js'
import mongoose from 'mongoose'
import { UserModel } from './models/mongo/user.js'
import {Server} from './index.js'
import { RegistersModel } from './models/mongo/registers.js'

const {
	MONGO_DEVELOPMENT_URI,
	MONGO_PRODUCTION_URI,
	NODE_ENV
} = process.env

console.log(MONGO_DEVELOPMENT_URI)

let connectionString = NODE_ENV == 'development'
	? MONGO_DEVELOPMENT_URI
	: MONGO_PRODUCTION_URI

try{
	await mongoose.connect(connectionString)
	console.log('database connected')  
}catch(err){
	console.log(err)
}

const userModel = new UserModel()
const registerModel = new RegistersModel()

Server({userModel,registerModel})