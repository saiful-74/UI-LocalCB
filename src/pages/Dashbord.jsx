import React from 'react'
import UserAside from '../Componentes/Asideber/UserAside'
import { Outlet } from 'react-router'

const Dashbord = () => {
  return (
    <div>
      <UserAside />
      <Outlet/>
    </div>
  )
}

export default Dashbord
