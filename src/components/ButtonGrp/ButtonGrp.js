import React from 'react'
import {useAuth} from "../../contextAPI/auth"
import { Link } from 'react-router-dom';

const ButtonGrp = () => {

  const {token, user, logout} = useAuth();


  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className='btn-g'>
        {(token && user?._id)?(<button className='button' onClick={handleLogout}>Log out</button>):
          (<button className='button'><Link to="/login">Log in</Link></button>)}
        <button className='button btn-color'>Sign up</button>
    </div>
  )
}

export default ButtonGrp