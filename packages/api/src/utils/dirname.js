import {fileURLToPath} from 'url'
import { dirname } from 'path'


function __dirname (){
	return dirname(fileURLToPath(import.meta.url))
}

export {__dirname}