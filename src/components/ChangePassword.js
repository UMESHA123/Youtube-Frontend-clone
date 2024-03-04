import React, {useState} from 'react'
import { useApp } from '../contextAPI/appcontext'
import PersonalLayout from '../Layout/PersonalLayout'
const ChangePassword = () => {
  const { apichangePassword } = useApp()
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const updatePasswordHandler = async () => {
    if(password === confirmPassword){
      if(password !== oldPassword){
        await apichangePassword(oldPassword,password);
      }else{
        alert('The current password and new password are same');
      }
    }else{
      alert('Check confirm password');
    }
  }
  const cancelHandler = () => {
    setOldPassword("")
    setPassword("")
    setConfirmPassword("");
  }
  return (
    <PersonalLayout>
      <div className='personal-info'>
        <h2>Personal info</h2>
        <p>Please enter your current password to change your password.</p>
      </div>
      <div className='personal-info-input'>
        <div className='input-container'>
          <div>
            <label id='fullname'>Current Password</label>
            <input type='password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}  placeholder='Enter current password' />
          </div>
          <div>
            <label>New password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='Enter new password' />
          </div>
          <div>
            <label>Confirm password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm password' />
          </div>
        </div>
        <div className='btn-bottom'>
          <button className='button' onClick={cancelHandler}>Cancel</button>
          <button className='button button' onClick={updatePasswordHandler}>Update password</button>
        </div>
      </div>
    </PersonalLayout>
  )
}

export default ChangePassword