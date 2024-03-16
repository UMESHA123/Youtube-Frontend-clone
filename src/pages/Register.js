import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../Layout/PublicLayout';
import { useAuth } from '../contextAPI/auth';
const Register = () => {

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const {register} = useAuth();
  
  const handleRegister = async () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);
    formData.append('coverImage', coverImage);
    
    //addDataType("formData")
    await register(formData)
    //addDataType("json")

}

  return (
    <PublicLayout>
        <div className='card-container'>
          <h1 className='card-title'>Sign up</h1>
          <div className='field-container'>
              <input className='input-field' value={fullName} onChange={(e) => setFullName(e.target.value)} type='text' placeholder='Fullname' required/>
              <input className='input-field' value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='UserName' required/>
              <input className='input-field' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required/>
              <input className='input-field' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' required/>
              <input className='file-input-field' type='file' onChange={(e => setAvatar(e.target.files[0]))} placeholder='Upload avatar' required/>
              <input className='file-input-field' type='file' onChange={(e => setCoverImage(e.target.files[0]))} placeholder='Upload Cover image' required/>
              <button className='button btn-color full-width' onClick={handleRegister}>Register</button>
              <div className='link'>If you have a account:<Link to="/login">login</Link></div>
          </div>
        </div>
    </PublicLayout>
  )
}

export default Register;