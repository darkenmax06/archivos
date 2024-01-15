
function errorHandler (req){
  if (req.error) throw req.error
  return req
}

export {errorHandler}