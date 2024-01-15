import { compare,addDataToCompare } from '../utils/compare.js'


class RegisterController {
	constructor (registerModel){
		this.registerModel = registerModel
	}

	// lo que pasa aqui es que que como ejecutamos en el router getAll(){ foo }
	// ...("/", registerModel.getAll) estamos poniendo la funcion
	// como una funcion normal, y al no tener this peta
	// asi que hay que hacerlo con arrow functions
	getAll = async  (req,res,next) => {
		const hcn = req.query.hcn
		try {
			const regsters = await this.registerModel.getAll({hcn})
			res.json(regsters)
		} catch (err) {
			next(err)
		}
	}

	getById = async  (req,res,next) => {
		const {id} = req.params
		try {
			const regsters = await this.registerModel.getById({id})
			res.json(regsters)
		} catch (err) {
			next(err)
		}
	}

	create = async (req,res,next) =>  {
		const {hcn,referencia,fechaDeIngreso,ubicacion,fechaDeRecibo,patologia} = req.body
		const {user} = req

		try {
			const result = await this.registerModel.create({
				hcn,
				referencia,
				fechaDeIngreso,
				ubicacion,
				fechaDeRecibo,
				patologia,
				user
			})
			res.json(result)
		} catch(err) {
			next(err)
		}
	}

	update = async (req,res,next) =>  {
		const {hcn,referencia,fechaDeIngreso,ubicacion,fechaDeRecibo,patologia} = req.body
		const {id} = req.params

		try {
			const result = await this.registerModel.update({
				hcn,
				referencia,
				fechaDeIngreso,
				ubicacion,
				fechaDeRecibo,
				patologia,
				id
			})
			res.json(result)
		} catch(err) {
			next(err)
		}
	}

	createSome = async (req,res,next) =>  {
		const data = req.body
		const {user} = req

		try {
			await compare(data)
			const result = await this.registerModel.createSome({data,user})
			await addDataToCompare(data)
			res.json(result)
		} catch(err) {
			next(err)
		}
	}

	delete = async (req,res,next) =>{
		const {id} = req.params
		try{
			await this.registerModel.delete({id})
			res.json({message: 'recurso eliminado'})
		} catch(err){
			next(err)
		}
	}
}


export {RegisterController}