import { useState } from "react"
import { useTheme } from "../../hooks/useTheme"
import { LogOut, Menu, Moon, Sun, X } from "lucide-react"
import "./leftMenu.css"
import { NavLink } from "react-router-dom"
import vite from "../../../public/vite.svg"
import useUser from "../../hooks/useUser"

function LeftMenu ({children}){
  const {isDark,setColorTheme} = useTheme()
  const {logoutUser} = useUser()
  const [isToggle,setIsToggle] = useState(false)

  const toggleMenu = () => {
    setIsToggle(!isToggle)
    const leftMenu = document.querySelector(".left-menu")
    leftMenu.classList.toggle("active")
  }
  
  const style = {
    background: isDark ? "var(--black1)": "var(--white2)",
    color: isDark ? "var(--white1)": "var(--black2)",
    "--red": isDark ? "var(--light-red)" : "var(--dark-red)",
    "--inversed": isDark ? "var(--black2)": "var(--white1)"
  }

  const actionStyles = { background: isDark ? "var(--gray2)": "var(--gray1)" }

  return (
    <header className="left-menu" style={style} >
      <div className="left-menu__logo-container">
        <img className="left-menu__logo"  src={vite} alt="logo" />
        <h3 className="subtitle" >Nombre</h3>
      </div>
      <div className="left-menu__actions " style={actionStyles} >
        <button className="left-menu__toggle headline" onClick={toggleMenu} >
          {
            isToggle
            ? <X color={style["color"]} />
            : <Menu color={style["color"]} />
          }
          Menu
        </button>

        <button className="left-menu__toggle headline" onClick={setColorTheme} >
          {
            isDark
            ? <> <Sun color={style["color"]} /> Modo: Noche </> 
            : <> <Moon color={style["color"]} /> Modo: Dia </>
          }
        </button>
      </div>

      <ul className="left-menu__list">
        {children}
      </ul>

      <button
        onClick={logoutUser} 
        className="left-menu__logout headline" >
          <LogOut/>
          Cerrar sesion
      </button>

      <div></div>
    </header>
  )
}

export function LeftMenuItem ({goTo,children}){
  return (
    <li className="left-menu-item headline" >
      <NavLink to={goTo} >
        {children}
      </NavLink>
    </li>
  )
}

export default LeftMenu