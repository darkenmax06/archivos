import readXlsxFile from 'read-excel-file'
import {useState} from 'react'
import registerServices from "../services/registers"
import { formatDate } from "../hooks/utils/formatDate"
import { formatUbication } from "../hooks/utils/formatUbication"
import { validateRegister } from './utils/validateRegister'
import {
  formatData,
  validateDates,
  validateRequires,
  getData,
  validateCorrectSintax,
  validateIsEmpty,
  validateNameFile
} from "./utils/someRegisters"
import useUser from './useUser'


export default function useRegisters() {
  const [register,setRegister] = useState(null)
  const [registers,setRegisters] = useState(null)
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState(null)
  const [error,setError] = useState(null)
  const {user} = useUser()

  const clearMessage = () => setMessage(null)
  const clearError = () => setError(null)

  const search = async ({value}) => {
    if (value){
      setLoading(true)
      const {token} = user
      
      try{
        const result = await registerServices
        .search({token,value})
        setRegisters(result)

      } catch(err){
        console.log(err)
      } finally{
        setLoading(false)
      }

    }else {
      setRegisters(null)
    }
  }

  const getById = async ({id}) => {
    const {token} = user
    setLoading(true)
    try{
      const result = await registerServices
      .getById({token,id})
      setRegister(result)
    } catch (err){
      console.log(err)
      setError(err)
    }finally {
      setLoading(false)
    }
  }

  const create = async ({register,handleReset}) => {
    setLoading(true)
    setError(null)
    setMessage(null)
    const {token} = user
    try {
      validateRegister(register)
      register.fechaDeIngreso = formatDate(register.fechaDeIngreso) 
      register.fechaDeRecibo = formatDate(register.fechaDeRecibo)
      register.ubicacion = formatUbication(register.ubicacion)
      await registerServices.create({token, register})
      handleReset()
      setMessage("registro creado")
    } catch (err) {
      console.log(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteRegister = async ({id}) => {
    const {token} = user
    setLoading(true)
    console.log(registers)
    try{
      await registerServices
      .deleteRegister({token,id})
      const deleteResource = registers.filter(res => res.id != id)
      setRegisters(deleteResource)
      setMessage("recurso eliminado")
    } catch (err){
      setError(err)
    }finally {
      setLoading(false)
    }
  }

  const update = async ({register,id}) => {
    setLoading(true)
    setError(null)
    setMessage(null)
    const {token} = user
    try {
      validateRegister(register)
      register.fechaDeIngreso = formatDate(register.fechaDeIngreso) 
      register.fechaDeRecibo = formatDate(register.fechaDeRecibo)
      register.ubicacion = formatUbication(register.ubicacion)
      await registerServices.update({token, register,id})
      setMessage("registro actualizado")
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const createSomeRegisters = async ({file}) => {
    setLoading(true)
    setMessage(null)
    setError(null)
    const {token} = user
    try{
      // validar el nombre del archivo
      validateNameFile(file)
      // estraccion de la data
      const data = await readXlsxFile(file)
      console.log(data)
      // validando si no hay registros
      validateIsEmpty(data)    
      // verificar si la 1ra columna es la de hcn
      // y si la ultima es la de patologia
      validateCorrectSintax(data)
      // optencion y transformacion de los datos a un objeto
      const gettedData = getData(data)
      console.log(gettedData)
      // validando que los datos requeridos esten
      validateRequires(gettedData)
      // verificando si la fecha es invalida
      validateDates(gettedData)
      const formattedData = formatData(gettedData)


      const res = await registerServices
      .createSome({token, data: formattedData})
      setMessage(res.message)
      setError(null)
    }catch(err){
      setError(err)
      setMessage(null)
    }
    finally {
      setLoading(false)
    }
  }

  return {
    registers,
    loading,
    error,
    message,
    register,
    createSomeRegisters,
    clearMessage,
    clearError,
    search,
    create,
    getById,
    update,
    deleteRegister
  }
}