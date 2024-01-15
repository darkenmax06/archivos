import {formatUbication} from "./formatUbication"
import {formatDate} from "./formatDate"

const validateNameFile = file => {
  const {name} = file
  const regex = /plantilla|archivos/

  const isPlantilla = regex.test(name)
  if (!isPlantilla) throw `La plantilla debe incluir en el nombre las palabras plantilla o archivos`
}

const validateIsEmpty = (data) => {
  if (data.length < 2) throw "el archivo no contiene registros"
}

const validateCorrectSintax = (data) => {
  const haveACorrectFormat = data
  .find(res => 
    res[0]?.toLowerCase().includes("hcn") &&
    res[5]?.toLowerCase().includes("patologia")
    )

  if (!haveACorrectFormat) {
    throw "la sintaxis de este archivo no es correcta" 
  }
}

const getData = (data) =>{
  const gettedData = data.map((row,y) => {
    if (y == 0) return null
    const hcn = row[0]
    const referencia = row[1]
    const fechaDeIngreso = row[2]
    const ubicacion = row[3]
    const fechaDeRecibo = row[4]
    const patologia = row[5]

    return {hcn,referencia,fechaDeIngreso,ubicacion,fechaDeRecibo,patologia}
  })

  // filtrar los registros que son null, suele ser el primero
  // ya que al tener los campos lo devuelvo null 
  const filtredNullData = gettedData.filter(res => res != null)

  if (!filtredNullData) throw "el archivo esta vacio"
  return filtredNullData
}

const validateRequires = data => {
  const filterDataLost = (res,index) => {
    if (res.hcn ==  null 
    || res.fechaDeIngreso == null 
    || res.ubicacion == null) {
      res.index= index
      return true
    }
    return false
  }

  const dataLost = data.find(filterDataLost)

  if (dataLost){
    const {hcn,fechaDeIngreso,index} = dataLost
    const position = index + 2

    if (!hcn) throw `El hcn cerca de la posicion en el documento de excel ${position} es requerida para realizar esta accion`
    else if (!fechaDeIngreso) throw `La fecha de ingreso del registro con el hcn ${hcn} es requerida para realizar esta accion`
    else throw `La ubicacion del registro con el hcn ${hcn} es requerida para realizar esta accion`
  }
}

const validateDates = data =>{
  const validateDate = res => {
    let fechaDeIngreso, fechaDeRecibo
  
    fechaDeIngreso = res.fechaDeIngreso 
    && new Date(res.fechaDeIngreso)
  
    fechaDeRecibo = res.fechaDeRecibo 
    && new Date(res.fechaDeRecibo)
  
    if (fechaDeIngreso == "Invalid Date") {
      res.error = {
        position: "fecha de ingreso",
        date: res.fechaDeIngreso,
        hcn: res.hcn
      }
      return true
    }
    else if (fechaDeRecibo == "Invalid Date") {
      res.error = {
        position: "fecha de recibo",
        date: res.fechaDeRecibo,
        hcn: res.hcn
      }
      return true
    }
    return false
  }

  const invalidDateVerification = data.find(validateDate)

  if (invalidDateVerification){
    const {position,date,hcn} = invalidDateVerification.error
    throw `La ${position} tiene una fecha invalida, fecha: ${date} en el hcn "${hcn}"`
  }
}

const formatData = data => {
  const parsedData = data.map(res =>{
    // esto es para crear un objeto nuevo
    const result = {...res}
    result.ubicacion = formatUbication(result.ubicacion)
    // dandole el ultimo formato a la fecha
    result.fechaDeIngreso = formatDate(result.fechaDeIngreso)
    result.fechaDeRecibo = formatDate(result.fechaDeRecibo)
    return result
  })

  return parsedData
}

export {
  formatData,
  validateDates,
  validateRequires,
  getData,
  validateCorrectSintax,
  validateIsEmpty,
  validateNameFile
}