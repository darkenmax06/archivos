const formatUbication = (ubicacion) =>{
  const withoutFormat = /^\w{1,4}-\w{1,4}$/
  const withFormat = /^[cC][hH]-\w{1,4}-\w{1,4}$/
  let parsedUbication = ubicacion

  if (withoutFormat.test(ubicacion)){
    const ubicationData = ubicacion.split("-")
    const formatedUbication = ubicationData.map(value => value.padStart(4, "0"))
  
    const ubicationResult = `CH-${formatedUbication[0]}-${formatedUbication[1]}`
    parsedUbication = ubicationResult
  } 
  
  else if (withFormat.test(ubicacion)){
    const ubicationData = ubicacion.split("-")
    const ch = ubicationData.shift()

    const formatedUbication = ubicationData
    .map(res => res.padStart(4,"0"))
    .join("-")

    const ubicationResult = `${ch}-${formatedUbication}`
    parsedUbication = ubicationResult
  }


  return parsedUbication
}

export {formatUbication}