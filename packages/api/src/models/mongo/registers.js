import { Schema, model } from 'mongoose'

const schema = new Schema({
	hcn: String,
	referencia: String,
	fechaDeIngreso: Date,
	ubicacion: String,
	fechaDeRecibo: Date,
	fechaDeProceso: Date,
	patologia: String,
	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

const Registers = model('Paciente', schema)

schema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

class RegistersModel {
	getAll = async ({hcn}) => {
		const registers = await Registers.find({hcn})
			.populate('usuario',{name: 1,lastName:1})
		return registers
	}

	getById = async ({id}) => {
		const register = await Registers.findById(id)
		if (!register) throw {name: 'INVALID_ID'}
		return register
	}

	async create ({hcn,referencia,fechaDeIngreso,ubicacion,fechaDeRecibo,patologia,user}) {
		const fechaDeProceso = new Date()

		const newRegister = new Registers({
			hcn,
			referencia,
			fechaDeIngreso,
			ubicacion,
			fechaDeRecibo,
			patologia,
			fechaDeProceso,
			usuario: user._id
		})

		const register =  await newRegister.save()

		return register
	}

	async createSome ({data,user}) {
		const length = data.length
		const fechaDeProceso = new Date()

		for (let i = 0; i < length; i++){
			const currentData = data[i]

			const register = new Registers({
				...currentData,
				fechaDeProceso,
				usuario: user._id
			})
			await register.save()
		}

		return {message: 'datos anadidos'}
	}

	async update ({hcn,referencia,fechaDeIngreso,ubicacion,fechaDeRecibo,patologia,id}) {
		const register = await Registers.findById(id)
		if(!register) throw {name: 'INVALID_ID'}

		const newRegister = Object.assign(
			register,
			{hcn,referencia,fechaDeIngreso,ubicacion,fechaDeRecibo,patologia}
		)

		const savedRegister =  await newRegister.save()

		return savedRegister
	}

	async delete ({id}){
		const registerExitst = await Registers.findById(id)
		if (!registerExitst) throw {name: 'INVALID_ID'}
		await Registers.findByIdAndDelete(id)
		return null
	}
}


export {RegistersModel}
// module.exports = model('Paciente', schema)