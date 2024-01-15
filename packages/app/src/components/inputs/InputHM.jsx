import { useId } from "react"
import { useTheme } from "../../hooks/useTheme"
import Input from "./Input"
import "./inputHM.css"

function InputHM ({
  children, 
  value , 
  handleChange,
  placeholder, 
  focus = "blue", 
  type = "text",
  full, 
  name}){
  const {isDark} = useTheme()
  const id = useId()

  const text = isDark ? "white1" : "black1"
  const background = isDark ? "gray2" : "gray1"
  const f = isDark ? `light-${focus}` : `dark-${focus}`

  return (
    <div className="label">
      <label htmlFor={id}> {placeholder} </label>
      <Input  
        full={full}
        text={text} 
        background={background}
        type={type} 
        focus={f}
        value={value}
        name={name}
        handleChange={handleChange}
        placeholder={placeholder}
        id={id} >
        {children}
      </Input>
    </div>
  )
}

export default InputHM