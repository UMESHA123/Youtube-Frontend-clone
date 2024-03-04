import React, {useState, useEffect } from 'react'
import { useApp } from '../contextAPI/appcontext'
import { useAuth } from '../contextAPI/auth'
import img1 from "./img1.png";
import { MdDelete } from "react-icons/md";
import { MdTipsAndUpdates } from "react-icons/md";
const MyChannelPlaylist = () => {
    const { apicreatePlaylist, apigetUserPlaylists, userPlaylists, apigetPlaylistBYId, apideletePlaylist, apiupdatePlaylist} = useApp();
    const {user} = useAuth();
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [updatePlaylistFlag, setUpdatePlaylistFlag] = useState(false);
    const [deletePlaylistFlag, setDeletePlaylistFlag] = useState(false);
    const [playlistCreatedFlag, setPlaylistCreatedFlag] = useState(false);
    const [playlistID, setPlaylistID] = useState('');
    useEffect(() => {
        const getAllUserPlaylist = async () => {
            await apigetUserPlaylists(user._id);
        }
        getAllUserPlaylist();
    }, [deletePlaylistFlag, playlistCreatedFlag])

    const createPlaylist = async () => {
        if(updatePlaylistFlag){
            await apiupdatePlaylist(playlistID,{name: playlistName, description: playlistDescription})
        }else{
            await apicreatePlaylist({name: playlistName, description: playlistDescription})
        }
        setPlaylistName("");
        setPlaylistDescription("");
        setPlaylistCreatedFlag(!playlistCreatedFlag);
    }
    const playlistUpdateHandler = async (playlist_Id, name, description) => {
        setUpdatePlaylistFlag(true);
        setPlaylistID(playlist_Id)
        setPlaylistName(name);
        setPlaylistDescription(description);
    }
    const deletePlaylistHandler = async (playlistId) => {
        await apideletePlaylist(playlistId);
        setDeletePlaylistFlag(!deletePlaylistFlag);
    }
    const showPlaylist = async (playlist_Id) => {
        await apigetPlaylistBYId(playlist_Id)
    }
  return (
    <div className='my-channel-playlist-container '>
        <div className='tweet-input'>
            <input type="text" placeholder="Enter Playlist name" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)}/>
            <textarea type='text' placeholder='Enter Playlist description...'value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)}></textarea>
            <button className='p-absolute button btn-color' onClick={createPlaylist}>{updatePlaylistFlag?"Edit":'Create'}</button>
        </div>
        <div className='playlist-container v-card-container'>
        {
            userPlaylists.length === 0 ?  "No playlist Found": 
            userPlaylists.map((playlist, index) => {
                if(playlist.videos.length === 0) return;
                return(
                    <div key={index} className='v-card' onClick={() => showPlaylist(playlist._id)}>
                        <div className='p-r-card-container'>
                            <img className='thumbnail' src={playlist.videos[0].thumbnail} alt='playlist thumbnail'/>
                            <div className='overlay-card'></div>
                        </div>
                        <div className='p-card-body'>
                            <p className='playlist-name'>{playlist.name}</p>
                            <p className='playlist-description'>{playlist.description.length >= 150 ? playlist.description.slice(0, 150)+"...": playlist.description}</p>
                            <div className='comment-crud'>
                                <span className="cursor" onClick={() => playlistUpdateHandler(playlist._id, playlist.name, playlist.description)}><MdTipsAndUpdates/></span>
                                <span className="cursor" onClick={() => deletePlaylistHandler(playlist._id)}><MdDelete/></span>
                            </div>
                        </div>
                    </div>
                );
            })
        }
        </div>
    </div>
  )
}

export default MyChannelPlaylist