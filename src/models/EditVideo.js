import React from 'react'

import { useApp } from '../contextAPI/appcontext';

const EditVideo = ({setUpdateFlag, thumbnail, title, description, setDescription, setTitle, setThumbnail, videoId}) => {
    
    const { apiupdateVideo} = useApp();
    
    const handleVideoUpdateUpload = async () => {
        await apiupdateVideo(videoId, thumbnail, title, description)
        setUpdateFlag(false)
        
    }
  return (
    <div className='model'>
        <div className='model-header'>
            <button className='button' onClick={() => setUpdateFlag(false)}>close</button>
        </div>
        <div className='model-body'>
            <div className="video-thumbnail-priview"><img src={thumbnail}/></div>
            <div className = "thumbnail-input"><input className='file-input' type='file' onChange={(e) => setThumbnail(e.target.files[0])} placeholder='Thumbnail' required/></div>
            <input className='input-field' type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' required/>
            <textarea className='text-area' type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' required></textarea>
        </div>
        <div className='model-footer btn-bottom'>
            <button className='button' onClick={() => setUpdateFlag(false)}>close</button>
            <button className='button btn-color' onClick={() => handleVideoUpdateUpload()}>Update</button>
        </div>
    </div>
  )
}

export default EditVideo