import React from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { useAuth } from "../contextAPI/auth"
const Layout = ({ children }) => {
  const { token, user } = useAuth();
  return (
    <div className='container'>
      {(token && user?._id) ? <Navbar /> : ""}
      {(token && user?._id) ? <SideBar /> : ""}
      {(token && user?._id)
        ? <main className='main-body'>
          {children}
        </main>
        : 
        <main>
            {children}
        </main>
        }
    </div>
  )
}

export default Layout