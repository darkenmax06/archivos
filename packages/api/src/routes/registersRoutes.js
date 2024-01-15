import { Router } from 'express'
import { RegisterController } from '../controller/registerController.js'
import { createSomeRegistersValidate } from '../middlewares/someRegistersValidate.js'
import { Token } from '../middlewares/tokenValidate.js'
import { createRegisterValidate } from '../middlewares/createRegisterValidate.js'

function registersRoutes ({registerModel,userModel}) {
	console.log(registerModel)
	const router = Router()
	const registerController = new RegisterController(registerModel)
	const token = new Token(userModel)

	router.get('/', token.validate,registerController.getAll)
	router.get('/:id', token.validate,registerController.getById)
	router.post('/', token.validate, createRegisterValidate,registerController.create)
	router.post('/some', token.validate,createSomeRegistersValidate,registerController.createSome)
	router.patch('/:id', token.validate, createRegisterValidate,registerController.update)
	router.delete('/:id', token.validate,registerController.delete)

	return router
}

export {registersRoutes}