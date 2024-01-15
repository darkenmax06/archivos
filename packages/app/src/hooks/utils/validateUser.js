
const validateUser = ({userName, password}) => {
  if (userName.length < 3) throw "los nombre de usuario deben ser mayores a 3 caracteres"
  else if (userName.length > 50) throw "los nombre de usuarios deben ser menores a 50 caracteres"
  else if (password.length < 3) throw "las contraseñas deben ser mayores a 3 caracteres"
  else if (password.length > 50) throw "las contraseñas deben ser menores a 50 caracteres"
}

export {validateUser}