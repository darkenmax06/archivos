const URI = "/api/login"
import { errorHandler } from "./utils/errorHandler"

const login = user =>{
  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {"content-type": "application/json"}
  }

  return fetch(URI ,options)
  .then(res => res.json())
  .then(errorHandler)
}

export default {login}