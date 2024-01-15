import {z} from 'zod'

const schema = z.object({
	hcn: z.string(),
	referencia: z.optional( z.string().nullable() ),
	fechaDeIngreso: z.coerce.date(),
	ubicacion: z.string(),
	fechaDeRecibo:  z.optional( z.coerce.date().nullable() ),
	patologia: z.optional( z.string().max(2500).nullable() ),
})

function createRegisterValidate(req,res,next){
	const validation = schema.safeParse(req.body)
	if (!validation.success){
		const data = validation.error.issues[0]
		return next({
			name: data.code,
			data
		})

	}

	next()
}

export {createRegisterValidate}