import React, {useState} from 'react'
import { PiVideoBold } from "react-icons/pi";
import { useApp } from '../contextAPI/appcontext';
import { MdOutlineDone } from "react-icons/md";
const Uploading = ({closeLoading}) => {
    const {videoPublishStatus} = useApp()
    const [uploading, setUploading] = useState(true);
    if(videoPublishStatus){
        // closeLoading();
        setUploading(false)
        alert("Video published successfully");
    }
    const finishHandler = () => {
        closeLoading()
        setUploading(true);
    }
    return (
    <div className='u-model'>
        <div className='u-model-header'>
            <h2>Uploading Video</h2>
            <p>Track your video uploading process</p>
        </div>
        <div className='u-model-body'>
            <div className='u-f'>
                <span className='u-text-f'>
                    <PiVideoBold className='u-icon btn-color'/>
                    <div className='size-f'>
                    <h4>Dashboard prototype recording.mp4</h4>
                    <p>16mb</p>
                    
                    </div>
                </span>
                <div className='m-left'>{uploading ? "Loading..." :<span> <MdOutlineDone className='done' /> Uploaded successfully.</span>}</div>
            </div>
            <div className='uploading-loader'>
            
            </div>
        </div>
        <div className='model-footer btn-bottom'>
            <button className='button btn-color' onClick={() => finishHandler()}>Finish</button>
        </div>
    </div>
  )
}

export default Uploading