import React, {useState} from 'react'
import { LuUpload } from "react-icons/lu";
import { useApp } from '../contextAPI/appcontext';

const UploadVideo = ({closeShowModel, setShowLoadingModel}) => {
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {apipublishVideo} = useApp();
    
    const handleVideoUpload = async () => {
        const formData = new FormData();
        formData.append("videoFile", video)
        formData.append("thumbnail", thumbnail)
        formData.append("title", title)
        formData.append("description", description)
        closeShowModel()
        setShowLoadingModel(true)
        await apipublishVideo(formData)
    }
  return (
    <div className='model'>
        <div className='model-header'>
            <button className='button' onClick={() => closeShowModel()}>close</button>
        </div>
        <div className='model-body'>
            <div className='video-input'><span className='i-c'><LuUpload className='v-icon'/><h3>Drag and drop video files to upload</h3><p>Your video will be private untill you publish them.</p><p>or</p></span><input className='file-input' type='file' onChange={(e) => setVideo(e.target.files[0])} placeholder='Video' required/></div>
            <div className = "thumbnail-input"><input className='file-input' type='file' onChange={(e) => setThumbnail(e.target.files[0])} placeholder='Thumbnail' required/></div>
            <input className='input-field' type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' required/>
            <textarea className='text-area' type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' required></textarea>
        </div>
        <div className='model-footer btn-bottom'>
            <button className='button' onClick={() => closeShowModel()}>close</button>
            <button className='button btn-color' onClick={() => handleVideoUpload()}>Upload</button>
        </div>
    </div>
  )
}

export default UploadVideo