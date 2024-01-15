import { useState } from "react"
import InputHM from "../inputs/InputHM"
import useRegisters from "../../hooks/useRegisters"
import { ButtonPrimary } from "../buttons/ButtonPrimary"
import { ArrowRight } from "lucide-react"
import InputErrorAlert from "../inputAlerts/InputErrorAlert"
import InputSuccessAlert from "../inputAlerts/InputSuccessAlert"
import "./registerForm.css"
import { Loader } from "../Loaders/Loader"
import { useTheme } from "../../hooks/useTheme"

function formatDate (date){
  if (!date) return null
  const newDate = new Date(date)
  .toLocaleDateString()
  .split("/")
  .reverse()
  .join("-")
  console.log(newDate)
  return newDate
}

function RegisterForms  ({ 
  hcn,
  referencia,
  fechaDeIngreso,
  ubicacion,
  fechaDeRecibo,
  patologia,
  id,
  title = "Crear"
}) {
  const [register,setRegister] = useState({
    hcn: hcn ?? "",
    referencia: referencia ?? "",
    fechaDeIngreso: formatDate(fechaDeIngreso) ?? "",
    ubicacion: ubicacion ?? "",
    fechaDeRecibo: formatDate(fechaDeRecibo) ?? "",
    patologia: patologia ?? ""
  })

  const handleReset = () => {
    setRegister({
      hcn: "",
      referencia: "",
      fechaDeIngreso: "",
      ubicacion: "",
      fechaDeRecibo: "",
      patologia: ""
    })
  }
  const {isDark} = useTheme()
  const {create,update,error,message,loading,clearMessage,clearError} = useRegisters()

  const handleChange = e => {
    setRegister( prevRegister => ({
      ...prevRegister,
      [e.target.name]: e.target.value
    }))
  }


  const handleSubmit = e => {
    e.preventDefault()
    if (hcn) update({register,id})
    else create({register,handleReset})
  }

  const style = {
    background: isDark ? "var(--black1)" : "var(--white2)"
  }

  return (
    <form className="form-register" style={style} onSubmit={handleSubmit} >
      <h2 className="title" >{title} registros</h2>
      <div className="form-register__inputs headline ">
        <InputHM
          name="hcn" 
          placeholder="hcn"
          value={register.hcn}
          handleChange={handleChange}   
        />

        <InputHM
          name="referencia" 
          placeholder="Referencia"
          value={register.referencia}
          handleChange={handleChange}     
        />

        <InputHM
          name="fechaDeIngreso" 
          placeholder="fecha de ingreso" 
          value={register.fechaDeIngreso}
          handleChange={handleChange}
          type="date"      
        />

        <InputHM
          name="fechaDeRecibo" 
          placeholder="fecha de recibo" 
          value={register.fechaDeRecibo}
          handleChange={handleChange} 
          type="date" />    

        <InputHM
          name="ubicacion" 
          placeholder="ubicacion"
          value={register.ubicacion}
          handleChange={handleChange}  
        />

        <InputHM
          name="patologia" 
          placeholder="patologia"
          value={register.patologia}
          handleChange={handleChange} 
        />
      </div>

      {error && <InputErrorAlert handleClose={clearError}  message={error} /> }
      {message && <InputSuccessAlert handleClose={clearMessage} message={message} /> }

      <ButtonPrimary full={true} loading={loading}>
        {title}
        {loading
          ? <Loader/>
          : <ArrowRight/> 
        }
      </ButtonPrimary>
    </form>
  )
}

export {RegisterForms}