import { useId, useState } from "react"
import LeftMenuContext from "../components/menus/LeftMenuContext"
import useRegisters from "../hooks/useRegisters"
import InputErrorAlert from "../components/inputAlerts/InputErrorAlert"
import InputSuccessAlert from "../components/inputAlerts/InputSuccessAlert"
import "./createSome.css"
import Load from "../components/Loaders/Load"
import { useTheme } from "../hooks/useTheme"
import InputTipAlert from "../components/inputAlerts/InputTipAlert"
import InputInfoAlert from "../components/inputAlerts/InputInfoAlert"


function CreateSome  () {
  const id = useId()
  const {
    createSomeRegisters,
    error,
    message,
    loading,
    clearError,
    clearMessage
  } = useRegisters()
  const {isDark} = useTheme()
  const [tip,setTip] = useState("si deseas pasar datos de la antigua copialos y pegalos en la nueva.")
  const clearTip = () => setTip(null)
  const [info,setInfo] = useState("recuerda que la plantilla antigua ya no funciona, ahora utilizamos una nueva con una mejor configuracion")
  const clearInfo= () => setInfo(null)



  const handleChange =  e => {
    // estraccion del archivo
    const file = e.target.files[0]
    createSomeRegisters({file})
  }

  const element = (
    <>
      <label htmlFor={id} className="create-some__label headline " >da click aqui para buscar el archivo</label>
      <input onChange={handleChange}  type="file" id={id} accept=".xlsx,.xslm,.xlsb,.xltx" />
    </>
  )

  const style = {
    background: isDark ? "var(--black1)" : "var(--white2)"
  }

  return (
    <LeftMenuContext>
      <div className="container">
        <section className="create-some" >
          <form className="create-some__form" style={style}>
            {loading ? <Load  /> : element}
            {error && <InputErrorAlert full={true} message={error} handleClose={clearError} /> }
            {message && <InputSuccessAlert full={true} message={message}  handleClose={clearMessage} /> }
            <span className="headline">Descarga la plantilla <a className="resalt" download href="/api/public/plantilla-archivos.xlsx"> Aqui</a></span>
            <div className="create-some__infos">
            {info && <InputInfoAlert full={true} message={info} handleClose={clearInfo} />}
            {tip && <InputTipAlert full={true} message={tip} handleClose={clearTip} />}
            </div>
          </form>
        </section>
      </div>
    </LeftMenuContext>
  )
}

export default CreateSome