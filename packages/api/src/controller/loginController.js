
class LoginController{
	constructor (userModel){
		this.userModel = userModel
	}

	login = async (req,res,next)=>{
		const {userName,password} = req.body
		try{
			const user = await this.userModel.login({userName,password})
			res.json(user)
		}catch(err){
			next(err)
		}
	}
}

export {LoginController}