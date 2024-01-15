import {  FilePlus, Search, Files} from 'lucide-react'
import LeftMenu, { LeftMenuItem } from "./LeftMenu"


function UserMenu (){
  return (
    <LeftMenu>
      <LeftMenuItem goTo="/search" >
        <Search/>
        Buscar
      </LeftMenuItem>

      <LeftMenuItem goTo="/create" >
        <FilePlus/>
        Crear (Individual)
      </LeftMenuItem>

      <LeftMenuItem goTo="/create/some" >
        <Files/>
        Crear (Lote)
      </LeftMenuItem>
    </LeftMenu>
  )
}

export {UserMenu}