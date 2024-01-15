function errorHandler (err,req,res,next){
	const {name} = err
	console.log('el nombre es: ', name)
	console.log('el error es: ', err)

	const errors = {
		'INVALID_SECRET': ()=> res.status(400).json({error: 'la llave secreta es incorrecta'}),
		'INVALID_ROLE': ()=> res.status(400).json({error: 'no tienes el rol para realizar esta accion'}),
		'INVALID_USER_VALIDATE': ()=>res.status(400).json({error: 'tu cuenta ha sido deabilitada o eliminada', logout: true}),
		'JsonWebTokenError':()=> res.status(400).json({error: 'Sus credenciales no estan siendo porporcionadas o no son correctas'}) ,
		'BAD_LOGIN': ()=> res.status(400).json({error: 'La contrasena o el userName proporcionado no es valido'}) ,
		'INVALID_ID': ()=> res.status(400).json({error: 'La id proporcionada no es valida, el recurso no existe o ya ha sido eliminado'}),
		'REQUIRED_ID': ()=> res.status(400).json({error: 'La id es requerida para realizar esta accion'}),
		// === ZOD ERRORS
		'too_small': ()=>{
			const {minimum, path} = err.data
			const campo = path[0]
			res.status(400).json({error: `el minimo de caracteres de para el campo ${campo} es de ${minimum} caracteres` })
		},
    
		'too_big': ()=>{
			const {maximum, path} = err.data
			const campo = path[0]
			res.status(400).json({error: `el maximo de caracteres de para el campo ${campo} es de ${maximum} caracteres` })
		},
    
		'invalid_string': ()=>{
			const {path} = err.data
			const campo = path[0]
			res.status(400).json({error: `El campo ${campo} proporcionado no es valido` })
		},

		'invalid_date': ()=>{
			const {path} = err.data
			const campo = path[0]
			res.status(400).json({error: `El campo ${campo} proporcionado no tiene fecha o no es valida` })
		},   
		'invalid_type': ()=>{
			const {path} = err.data
			const campo =  path[0] ?? 'debe ser una lista de datos ya que'
			res.status(400).json({error: `El elemento ${campo} es requerido` })
		},
		'DUPLICATED_DATA': () =>{
			const {hcn,fechaDeIngreso} = err.data
			const fecha = new Date(fechaDeIngreso).toLocaleDateString()
			res.status(400).json({error: `El elemento con el hcn ${hcn} y la fecha de ingreso ${fecha} ya existe` }) 
		},
		'USER_ALREADY_EXISTS': () => res.status(400).json({ error: 'Ya existe un usuario con este userName' }),
		// === MONGO ERRORS
		'CastError': ()=> res.status(400).json({error: 'la id proporcionada no es una id valida'}),
		'11000': ()=> res.status(400).json({error: 'ya existe una cuenta con este userName, por favor ingrese uno nuevo'}),

		// === MYSQL ERRORS
		'ER_DUP_ENTRY': ()=> res.status(400).json({error: 'ya existe una cuenta con este userName, por favor ingrese uno nuevo'}),
		'DEFAULT': ()=> res.status(500).json({error: 'ha ocurrido un error con el servidor, por favor notifique al servicio'})
	}

	return errors[name]
		? errors[name]()
		: errors['DEFAULT']()
}

export {errorHandler}