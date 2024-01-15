
const formatDate = date => {
  if (!date) return null
  const newDate= new Date(date)
  .getTime()

  const diff = 1000 * 60 *60 *4
  return new Date(newDate + diff)
}

export {formatDate}