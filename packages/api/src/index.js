import Express, {json} from 'express'
import { usersRouter } from './routes/usersRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { loginRoute } from './routes/loginRoute.js'
import { registersRoutes } from './routes/registersRoutes.js'
import './utils/deleteCompare.js'
import {fileURLToPath} from 'url'
import { dirname, join } from 'path'

const __dirname = dirname( fileURLToPath( import.meta.url ) )
const excel = join(__dirname, '../public/')
const page = join( __dirname, '../../app/dist' )

function Server ({userModel,registerModel}){
	const app = Express()
	app.use(json())

	app.use(Express.static( page ))
	app.use('/api/public', Express.static(excel))
	app.use('/api/users',usersRouter({userModel}) )
	app.use('/api/login',loginRoute({userModel}) )
	app.use('/api/registers',registersRoutes( {registerModel,userModel} ) )
	app.use('*', (req,res) => {
		res.sendFile( join(page, 'index.html') )
	})

	app.use( errorHandler )

	const PORT = process.env.PORT ?? 3000
	return app.listen(PORT, ()=> console.log(`Server on port ${PORT} http://localhost:${PORT}`))
}

export {Server}