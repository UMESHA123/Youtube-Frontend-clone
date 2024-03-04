import React, {useState} from 'react'
import PersonalLayout from '../Layout/PersonalLayout'
import { useApp } from '../contextAPI/appcontext'
import { useAuth } from '../contextAPI/auth'
const PersonalInformation = () => {
    const { apiupdateAccount } = useApp()
    const { user } = useAuth();

    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);

    const cancelHandler = () => {
        setFullName(user.fullName);
        setEmail(user.email);
    }
    const saveChangesHandler = async () => {
        await apiupdateAccount(fullName, email);
    }
    return (
        <PersonalLayout>
            <div className='personal-info'>
                <h2>Personal info</h2>
                <p>Update your Photo and personal details</p>
            </div>
            <div className='personal-info-input'>
                <div className='input-container'>
                    <div>
                        <label id='fullname'>Fullname</label>
                        <input type='text' value={fullName} onChange={((e) => setFullName(e.target.value))} placeholder='Enter Fullname' />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />

                    </div>
                </div>
                <div className='btn-bottom'>
                    <button className='button' onClick={cancelHandler}>Cancel</button>
                    <button className='button button' onClick={saveChangesHandler}>Save Changes</button>
                </div>
            </div>
        </PersonalLayout>
    )
}

export default PersonalInformation