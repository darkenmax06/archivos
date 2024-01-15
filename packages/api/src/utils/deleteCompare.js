import cron from 'node-cron'
import {fileURLToPath} from 'url'
import { dirname, join } from 'path'
import { unlink } from 'fs/promises'

const __dirname = dirname( fileURLToPath(import.meta.url) )
const path = join(__dirname, '../../public/compare.json')
const days = '0 22 */3 * *'

cron.schedule(days, ()=>{
	unlink(path)
		.then(() => console.log('archivo eliminado'))
		.catch(() => console.log('el archivo ya fue eliminado anteriormente'))
})