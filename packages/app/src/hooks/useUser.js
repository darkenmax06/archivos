import loginServices from "../services/login"
import { useNavigate } from 'react-router-dom'
import {useContext, useState} from 'react'
import { userContext } from '../context/UserContext'
import { validateUser } from "./utils/validateUser"

export default function useUser() {
  const {user,saveUser,logoutUser} = useContext(userContext)
  const [error,setError] = useState(null)
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)


  const clearError = () => setError(null)

  const login = async ({user}) => {
    setLoading(true)
    setError(null)
    try {
      validateUser(user)
      const res = await loginServices.login(user)
      saveUser(res)
      navigate("/search")
    }catch(err){
      console.log(err)
      setError(err)
    }finally{
      setLoading(false)
    }
  }

  return {
    login,
    user,
    error,
    loading,
    clearError,
    logoutUser
  }
}