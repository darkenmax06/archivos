import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFile, writeFile } from 'fs/promises'
import { sintax } from './sintax.js'

const __dirname = dirname( fileURLToPath(import.meta.url) )
const path = join(__dirname, '../../public/compare.json')  


async function compare (data) {
	if (!data) return null

	let indexes = {}
	try{
		const res = await readFile(path,'utf-8')
		if (res) indexes = JSON.parse(res)
	} catch (err) {
		return null
	}

	const hasDuplicates = data.find(res => indexes[sintax(res)] )

	if (hasDuplicates) {
		throw {
			name: 'DUPLICATED_DATA',
			data: hasDuplicates
		}
	}
}

async function addDataToCompare (data){
	if (!data) return null

	let gettedIndexes = null
	try{
		const res = await readFile(path,'utf-8')
		if (res) gettedIndexes = JSON.parse(res)
	} catch (err) {
		gettedIndexes = {}
	}
  
	const createIndex = (acc,res) =>{
		return {
			...acc,
			[sintax(res)]: res
		}
	}

	const indexes = data.reduce(createIndex,{})
	const dataToSave = JSON.stringify({
		...gettedIndexes,
		...indexes
	})

	console.log('desde create', indexes)

	await writeFile(path, dataToSave , 'utf8')
}


export {compare,addDataToCompare}