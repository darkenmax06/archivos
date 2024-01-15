

const validateRegister = (register) => {
  if (!register.hcn) throw "El hcn es necesario para realizar esta accion"
  else if (!register.fechaDeIngreso) throw "La fecha de ingreso es necesaria para realizar esta accion"
  else if (!register.ubicacion) throw "La ubicacion es necesaria para realizar esta accion"
}

export {validateRegister}