import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useRegisters from "../hooks/useRegisters"
import { RegisterForms } from "../components/forms/RegisterForm"
import ErrorAlert from "../components/alerts/ErrorAlert"
import LeftMenuContext from "../components/menus/LeftMenuContext"
import "./update.css"

function Update  () {
  const {id} = useParams()
  const {getById, loading, error, message,register,clearError} = useRegisters()
  

  useEffect(()=>{
    if (id){
     getById({id})
    }
  },[id])

  if (!id) return "necesitas la id para realizar esta accion"
  return (
    <LeftMenuContext>
      <div className="container">
        <div className="update">
          {
            loading 
            ? "cargando..."
            : <RegisterForms {...register} title="Actualizar" />
          }
          {error && <ErrorAlert handleClose={clearError} > {error} </ErrorAlert> }
        </div>
      </div>
    </LeftMenuContext>
  )
}

export default Update

