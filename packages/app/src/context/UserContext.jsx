import { createContext, useState } from "react";


export const userContext = createContext()

function UserContext ({children}){
  const [user,setUser] = useState(null)

  const saveUser = user => setUser(user)
  const logoutUser = () => setUser(null)

  return (
    <userContext.Provider value={{
      user,
      saveUser,
      logoutUser
    }}>
      {children}
    </userContext.Provider>
  )
}

export default UserContext