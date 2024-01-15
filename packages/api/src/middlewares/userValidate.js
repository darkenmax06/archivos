import z from 'zod'

const userSchema = z.object({
	name: z.string().min(3).max(50),
	lastName: z.string().min(3).max(50),
	password: z.string().min(3).max(50),
	userName:z.string().min(3).max(50),
	secret:z.optional( z.string().min(3).max(50)),
	admin: z.optional( z.boolean())
})



function userValidator(req,res,next){
	const validation = userSchema.safeParse(req.body)
	if (!validation.success){
		const data= validation.error.issues[0]
		return next({
			name: data.code,
			data
		})
	}

	next()
}

export {userValidator}