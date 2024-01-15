import "./leftMenuContext.css"
import useUser from "../../hooks/useUser"
import { AdminMenu } from "./AdminMenu"
import { UserMenu } from "./UserMenu"

// ESTE ES UN EJEMPLO
// de un menu basico
function LeftMenuContext ({children}){
  const {user} = useUser()
  
  return (
    <section className="left-menu-context" >
      {
        user.type == "user"
          ? <UserMenu/>
          : <AdminMenu/>
      }
      { children }
    </section>
  )
}

export default LeftMenuContext