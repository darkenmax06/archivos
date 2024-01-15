import "./login.css"
import NormalInput from "../components/inputs/NormalInput"
import { User, Lock, ArrowRight } from "lucide-react"
import { ButtonPrimary } from "../components/buttons/ButtonPrimary"
import { useState } from "react"
import InputErrorAlert from "../components/inputAlerts/InputErrorAlert"
import useUser from "../hooks/useUser"
import { Loader } from "../components/Loaders/Loader"

function Login (){
  const [user,setUser] = useState({
    userName: "",
    password: ""
  })
  const {loading,error,login,clearError} = useUser()

  // esto esta hecho asi para no crear 2 handleChanges
  // Lo que hacemos es poner como propiedad el nombre del input
  // y asi le asignamos el valor del input
  const handleChange = e =>{
    setUser(prevUser => 
      ({
        ...prevUser,
        [e.target.name]: e.target.value
      })
    )
  }
  


  const handleSubmit = e => {
    e.preventDefault()
    login({user})
  }

  return (
    <div className="center">
      <form action="" className="form" onSubmit={handleSubmit} >
        <h3 className=" header-secondary">
          INICIAR SESION
        </h3>

        <div className="form__inputs">
          <NormalInput 
            placeholder="nombre de usuario" 
            type="text" 
            name="userName" 
            handleChange={handleChange}
            full={true} 
            value={user.userName} >
              <User/>
          </NormalInput>
          <NormalInput 
            placeholder="contraseña" 
            type="password" 
            full={true} 
            name="password"
            handleChange={handleChange} 
            value={user.password} >
              <Lock/>
          </NormalInput>
        </div>

        {error && <InputErrorAlert handleClose={clearError} full={true} message={error} />}

        <div className="form__actions">
            <ButtonPrimary >
              iniciar sesion
              {loading ? <Loader/>: <ArrowRight/>}
            </ButtonPrimary>
        </div>
      </form>
    </div>
  )
}

export default Login