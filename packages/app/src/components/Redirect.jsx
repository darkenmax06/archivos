import { Navigate } from "react-router-dom"
import useUser from "../hooks/useUser"


function Redirect  ({children}) {
  const {user} = useUser()

  if (!user) return <Navigate to="/login" />

  return <> {children} </>
}

export {Redirect}