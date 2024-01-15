import { NavLink } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import "./card.css"
import { ButtonPrimary } from '../buttons/ButtonPrimary'
import { Pencil, Trash, Trash2 } from 'lucide-react'


function Card ({
  hcn, 
  fechaDeIngreso,
  fechaDeProceso, 
  usuario,
  ubicacion,
  fechaDeRecibo,
  referencia,
  patologia,
  id,
  deleteRegister
}){
  const {isDark} = useTheme()

  const style = {
    "--gray": isDark ? "var(--black1)" :"var(--white2)"
  }

  const formatFDI = fechaDeIngreso && new Date(fechaDeIngreso).toLocaleDateString()
  const formatFDP = fechaDeProceso && new Date(fechaDeProceso).toLocaleDateString()
  const formatFDR = fechaDeRecibo && new Date(fechaDeRecibo).toLocaleDateString()


  return (
    <div className="card" style={style} >
      <span className="card__span subtitle ">
        {hcn}
      </span>
      <ul className='card__info headline' >
        <li> 
          <span className="resalt"> Ubicacion: </span> 
          {ubicacion} 
        </li>

        <li> 
          <span className="resalt"> Referencia: </span> 
          {referencia} 
        </li>

        <li> 
          <span className="resalt"> Fecha de Ingreso: </span> 
          {formatFDI} 
        </li>

        <li> 
          <span className="resalt"> Fecha de Proceso: </span> 
          {formatFDP} 
        </li>

        <li> 
          <span className="resalt"> Fecha de Recibo: </span> 
          {formatFDR} 
        </li>

        <li> 
          <span className="resalt"> Creado Por: </span> 
          {usuario.name.split(" ")[0]}
          {" "} 
          {usuario.lastName.split(" ")[0]} 
        </li>
      </ul>

      <span className="card__span resalt "> Patologia: </span>
      <span className="card__span-patologia body ">
        {patologia}
      </span>

      <div className="card__actions">
        <NavLink to={`/update/${id}`} >
          <ButtonPrimary color='orange' >
            editar
            <Pencil/>
          </ButtonPrimary>
        </NavLink>

        <ButtonPrimary color='red' handleClick={() => deleteRegister({id})} >
            borrar
            <Trash2/>
        </ButtonPrimary>
      </div>
    </div>
  )
}


export {Card}