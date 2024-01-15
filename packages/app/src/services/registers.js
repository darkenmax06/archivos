import { errorHandler } from './utils/errorHandler'
const URI = "/api/registers"


function deleteRegister({id,token}){
  const OPTIONS = {
    method:"DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  return fetch(`${URI}/${id}`, OPTIONS)
  .then(res => res.json())
  .then(errorHandler)
}

function getById ({id,token}){
  const OPTIONS = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  return fetch(`${URI}/${id}`, OPTIONS)
  .then(res => res.json())
  .then(errorHandler)
}

function create ({token, register}){
  const options = {
    method: "POST",
    body: JSON.stringify(register),
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${token}` 
    }
  }

  return fetch(URI,options)
  .then(res => res.json())
  .then(errorHandler)
}

function update ({token, register,id}){
  const options = {
    method: "PATCH",
    body: JSON.stringify(register),
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${token}` 
    }
  }

  return fetch(`${URI}/${id}`, options)
  .then(res => res.json())
  .then(errorHandler)
}

function search ({token,value}){
  const options = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  return fetch(`${URI}/?hcn=${value}`,options)
  .then(res=> res.json())
  .then(res => res)
}

function createSome ({data,token}){
  const OPTIONS = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  }
  
  return fetch(`${URI}/some`,OPTIONS)
  .then(res => res.json())
  .then(errorHandler)
}


export default {
  createSome,
  search,
  create,
  getById,
  update,
  deleteRegister
}