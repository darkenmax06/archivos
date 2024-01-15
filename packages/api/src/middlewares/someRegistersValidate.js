import { z } from 'zod'


// hcn: String,
// referencia: String,
// fechaDeIngreso: Date,
// ubicacion: String,
// fechaDeRecibo: Date,
// patologia: String,

const schema = z.array(	z.object({
	hcn: z.string(),
	referencia: z.optional( z.string().nullable() ),
	fechaDeIngreso: z.coerce.date(),
	ubicacion: z.string(),
	fechaDeRecibo:  z.optional( z.coerce.date().nullable() ),
	patologia: z.optional( z.string().max(2500).nullable() ),
}))


function createSomeRegistersValidate (req,res,next){
	const elements = req.body
	console.log('elements')
	console.log(elements)

	const validation = schema.safeParse(elements)

	if (!validation.success){
		const error = validation.error.issues[0]
		const {path} = error

		if ( path.length > 1){
			const currentElement = elements[ path[0] ]
			const {hcn} = currentElement
			const campo = error.path[1]
			error.path = [`${campo} del elemento con el hcn ${hcn ?? 'no definido'}`]
		}

		return next({
			name: error.code,
			data: error
		})
	}

	next()

}

export {createSomeRegistersValidate}