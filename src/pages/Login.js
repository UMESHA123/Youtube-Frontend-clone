import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '../Layout/PublicLayout'
import {useAuth} from "../contextAPI/auth";
const Login = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useAuth();


  const handleLogin = async () => {
    // console.log("loginhandler");
    // console.log({
    
    //   password: password,
    //   username: username,
    // })
    await login({
      // email: email,
      password: password,
      username: username
    })
  }

  return (
    <PublicLayout>
        <div className='card-container'>
          <h1 className='card-title'>Log in</h1>
          <div className='field-container'>
              <input className='input-field' value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='UserName' required/>
              <input className='input-field' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required/>
              <input className='input-field' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' required/>
              <button className='button btn-color full-width' onClick={() => handleLogin()}>Log in</button>
              <div className='link'>If not have a account:<Link to="/register">Register</Link></div>
          </div>
        </div>
    </PublicLayout>
  )
}

export default Login