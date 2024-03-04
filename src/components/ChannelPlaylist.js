import React, {useState, useEffect } from 'react'
import { useApp } from '../contextAPI/appcontext'
import { useAuth } from '../contextAPI/auth'

const ChannelPlaylist = () => {
  const { apigetUserPlaylists, userPlaylists, apigetPlaylistBYId, userChannelProfile} = useApp();
    const {user} = useAuth();

    useEffect(() => {
        const getAllUserPlaylist = async () => {
            await apigetUserPlaylists(userChannelProfile._id);
        }
        getAllUserPlaylist();
    }, [])

   
    const showPlaylist = async (playlist_Id) => {
      await apigetPlaylistBYId(playlist_Id)
  }   
  return (
    <div className='my-channel-playlist-container '>
       
        <div className='playlist-container v-card-container'>
        {
            userPlaylists.length === 0 ?  "No playlist Found": 
            userPlaylists.map((playlist, index) => {
                if(playlist.videos.length === 0)return;
                return(
                    <div key={index} className='v-card' onClick={() => showPlaylist(playlist._id)}>
                        <div className='p-r-card-container'>
                            <img className='thumbnail' src={playlist.videos[0].thumbnail} alt='playlist thumbnail'/>
                            <div className='overlay-card'></div>
                        </div>
                        <div className='p-card-body'>
                            <p className='playlist-name'>{playlist.name}</p>
                            <p className='playlist-description'>{playlist.description.length >= 150 ? playlist.description.slice(0, 150)+"...": playlist.description}</p>
                           
                        </div>
                    </div>
                );
            })
        }
        </div>
    </div>
  )
}

export default ChannelPlaylist