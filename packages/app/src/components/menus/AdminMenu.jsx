import {  FilePlus, Search, Users, UserPlus, Files} from 'lucide-react'
import LeftMenu, { LeftMenuItem } from "./LeftMenu"


function AdminMenu (){
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

      <LeftMenuItem goTo="/create/some" >
        <Users/>
        Gestionar usuarios
      </LeftMenuItem>

      <LeftMenuItem goTo="/create/some" >
        <UserPlus/>
        Crear ususarios
      </LeftMenuItem>
    </LeftMenu>
  )
}

export {AdminMenu}