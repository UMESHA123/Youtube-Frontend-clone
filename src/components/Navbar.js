import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import ButtonGrp from './ButtonGrp/ButtonGrp';
import { Link } from 'react-router-dom';
import { sidebar_data } from './SideBar';
import {useAuth} from "../contextAPI/auth";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const {user, token, logout} = useAuth();


  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className='navbar'>
      <div className='logo'>
        {/* <img src=''/> */}
        <h1>Logo</h1>
      </div>
      <div className='input'>
        <div className='search-icon'><IoSearch/></div>
        <input type='text'/>
      </div>
      <ButtonGrp/>
      <div className='three-line' onClick={() => setToggle(!toggle)}>
      {toggle ? <RxCross1/> : <RiMenu3Line/>}
      </div>
      <div className={toggle ? 'right-sidebar': 'right-sidebar-hidden'}>
        
        {
          sidebar_data.map((item, index) => {
            return (
              <div className={`right-item-container ${(index === 0 || index === 2 || index === 4 || index === 5) ? "hidden": ""}`} key={index}>
                <Link to={item.link}>
                  <div className='item-icon'>
                    {item.icon}
                  </div>
                  <div className='item-title'>
                    {item.title}
                  </div>
                </Link>
              </div>
            )
          })
        }
        <div className='btn-group'>
          {(token && user?._id)?(<button onClick={handleLogout} className='button'>Log out</button>):
          (<button className='button'><Link to="/login">Log in</Link></button>)}
          <button className='button btn-color'>Sign up</button></div>
      </div>
    </div>
  )
}

export default Navbar