
class UserController{
	constructor(userModel){
		this.userModel = userModel
	}

	getAll = async (req,res,next) =>{
		try{
			const users = await this.userModel.getAll()
			res.json(users)
		}catch(err){
			return next(err)
		}
	}

	getById = async (req,res,next) =>{
		const {userId} = req.params
		if (!userId) next({name: 'REQUIRED_ID'})

		try{
			const user = await this.userModel.getById({userId})
			res.json(user)
		}catch(err){
			return next(err)
		}
	}

	create = async (req,res,next) =>{
		console.log(req.body)
		const {name, lastName, password, userName,admin,secret} = req.body
		try{
			const user = await this.userModel.create({admin, name, lastName, password, userName,secret})
			res.json(user)
		}
		catch (err){
			if (err.code){
				return next({
					name: err.code
				})
			}

			return next( err)
		}
	}

	update = async (req,res,next) =>{
		const {name,lastName, userName,password,disable} = req.body
		const {userId} = req.params
		if (!userId) next({name: 'REQUIRED_ID'})
    
		try{
			const user = await this.userModel.update(
				{name, lastName, userName,password,userId,disable}
			)
			res.json(user)
		}catch(err){
			if (err.code){
				return next({
					name: err.code
				})
			}

			return next( err)
		}
	}

	delete = async (req,res,next) =>{
		const {userId} = req.params
		if (!userId) next({name: 'REQUIRED_ID'})

		try{
			await this.userModel.delete({userId})
			res.json({message: 'Usuario eliminado'})
		}catch(err){
			next(err)
		}
	}
}

export {UserController}