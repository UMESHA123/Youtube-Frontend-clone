import React, {useState} from 'react'
import Layout from '../Layout/Layout'
import { useApp } from '../contextAPI/appcontext'
import { NavLink, Outlet } from 'react-router-dom';

const MyChannel = () => {
    const { myUserChannelProfile } = useApp();
    const [edit, setEdit] = useState(false);
    const editHandler = () => setEdit(!edit);
    
    return (
        <Layout>
            <div className='user-channel-body'>
                <div className='user-channel-profile'>
                    {/* <img className='user-channel-coverImage' src={myUserChannelProfile.coverImage} alt='user channel profile'/> */}
                    <div className='user-channel-coverImage'></div>
                    <div className='user-avatar-btn'>
                        <img className="user-channel-profile-avatar" src={myUserChannelProfile?.avatar} alt='user channel profile avatar' />
                    </div>
                    <div className='user-basic-info'>
                        <div className=''>
                            <p className='channel-name'>{myUserChannelProfile?.username}</p>
                            <p className='channel-username'>@{myUserChannelProfile.fullName}</p>
                            <p className='channel-fullname'>{myUserChannelProfile.subscribersCount} Subscribers</p>
                        </div>
                        <button className='button' onClick={editHandler}>{edit?'View Channel':"Edit"}</button>
                    </div>
                </div>
              
                {edit?(<div className='p-2'>
                    <nav className='nav-tab'>
                        <NavLink to="personal-information">Personal Information</NavLink>
                        <NavLink to="channel-information">Channel Information</NavLink>
                        <NavLink to="change-password">Change Password</NavLink>
                    </nav>
                    <Outlet/>
                </div>):(
                    <div className='p-2'>
                    <nav className='nav-tab'>
                        <NavLink className="tab-width" to="Mychannel-videos">Videos</NavLink>
                        <NavLink className="tab-width" to="Mychannel-playlists">PlayList</NavLink>
                        <NavLink className="tab-width" to="Mychannel-tweets">Tweets</NavLink>
                        <NavLink className="tab-width" to="Mychannel-subscribers">Subscribers</NavLink>
                        {/* <Outlet/> */}
                    </nav>
                    <Outlet />
                </div>
                )}
            </div>
        </Layout>
    )
}

export default MyChannel