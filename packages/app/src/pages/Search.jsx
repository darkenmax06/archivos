import {  Search } from 'lucide-react'
import LeftMenuContext from '../components/menus/LeftMenuContext'
import BordedInput from '../components/inputs/BordedInput'
import "./search.css"
import { useEffect, useState } from 'react'
import { Card } from '../components/cards/Card'
import useRegisters from '../hooks/useRegisters'
import SuccessAlert from "../components/alerts/SuccessAlert"
import ErrorAlert from "../components/alerts/ErrorAlert"
import Load from '../components/Loaders/Load'

function Index (){
  const [value,setValue] = useState("")
  const {deleteRegister,loading,error,message,registers, search,clearError,clearMessage} = useRegisters()
  const handleChange = e => setValue(e.target.value)

  useEffect(()=>{
    search({value})
  },[value])

  return (
    <LeftMenuContext>
      <div className="container">
        <section className='search' >
          <h1 className='header'>
            BUSCAR 
          </h1>

          <BordedInput
            value={value} 
            handleChange={handleChange}
            placeholder="ingrese el hcn" >
              <Search/>
          </BordedInput>

          <div className="search__results">
            {registers && registers.length > 0 && 
              registers.map(res => <Card 
                key={res.id} 
                error={error}
                deleteRegister={deleteRegister}
                message={message}
                clearError={clearError}
                clearMessage={clearMessage} 
                {...res} />)
            }
          </div>
          {registers && registers.length == 0 && "no se han encontrado resultados" }
          {!registers && loading != false && "ingrese el hcn para buscar"}
          {loading && !registers && <Load/> }

          {error && <ErrorAlert handleClose={clearError} > {error} </ErrorAlert>}
          {message && <SuccessAlert handleClose={clearMessage} > {message} </SuccessAlert>}
        </section>
      </div>
    </LeftMenuContext>
  )
}

export default Index