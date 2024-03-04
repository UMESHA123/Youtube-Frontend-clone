import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useApp } from '../contextAPI/appcontext'
import { NavLink, Outlet } from 'react-router-dom';

const Channel = () => {
    const { userChannelProfile} = useApp();

    // useEffect(() => {
    //     const getAllVideos = async () => {
    //       await apigetAllVideos({});
    //     }
    //     getAllVideos()
    //   }, [])


    return (
        <Layout>
            <div className='user-channel-body'>
                <div className='user-channel-profile'>
                    {/* <img className='user-channel-coverImage' src={userChannelProfile.coverImage} alt='user channel profile'/> */}
                    <div className='user-channel-coverImage'></div>
                    <div className='user-avatar-btn'>
                        <img className="user-channel-profile-avatar" src={userChannelProfile.avatar} alt='user channel profile avatar' />
                    </div>
                    <div className='user-basic-info'>
                        <div className=''>
                            <p className='channel-name'>{userChannelProfile?.username}</p>
                            <p className='channel-username'>@{userChannelProfile.fullName}</p>
                            <p className='channel-fullname'>{userChannelProfile.subscribersCount} Subscribers</p>
                        </div>
                        <button className='button'>Subscribe</button>
                    </div>
                </div>
                <div className='p-2'>
                    <nav className='nav-tab'>
                        <NavLink to="channel-videos">Videos</NavLink>
                        <NavLink to="channel-playlists">PlayList</NavLink>
                        <NavLink to="channel-tweets">Tweets</NavLink>
                        <NavLink to="channel-subscribers">Subscribers</NavLink>
                        {/* <Outlet/> */}
                    </nav>
                    <Outlet />
                </div>

            </div>

        </Layout>
    )
}

export default Channel