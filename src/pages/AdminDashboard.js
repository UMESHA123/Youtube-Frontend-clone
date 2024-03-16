import React, { useEffect, useState } from 'react'
import { useApp } from '../contextAPI/appcontext'
import Layout from '../Layout/Layout';
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import UploadVideo from '../models/UploadVideo';
import Uploading from '../models/Uploading';
import EditVideo from '../models/EditVideo';

const AdminDashboard = () => {
  const { apigetChannelStats, apigetChannelVideos, channelStats, channelVideos, apigetVideoByIdDetails, videoDetails, apideleteVideo } = useApp();

  const [showModel, setShowModel] = useState(false);


  const [showLoadingModel, setShowLoadingModel] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [thumbnail, setThumbnail] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [videoId, setVideoId] = useState("");
  const closeShowModel = () => setShowModel(false);
  const closeLoading = () => setShowLoadingModel(false);

  useEffect(() => {
    const getchannelstatus = async () => {
      await apigetChannelStats();
      await apigetChannelVideos();
    }
    getchannelstatus();
  }, [toggle, setUpdateFlag])
  const deleteVideo = async (videoId) => {

    await apideleteVideo(videoId);
    setToggle(!toggle);
  }

  const updateVideoHandler = async (videoId) => {
    await apigetVideoByIdDetails(videoId)
    setVideoId(videoId)
    setTitle(videoDetails?.title)
    setDescription(videoDetails?.description)
    
    setThumbnail(videoDetails?.thumbnail)
    // console.log(title, description);
    setUpdateFlag(true);
  }
  return (
    <Layout>
      <div className='m-10'>
        <div>
          <h1>Welcome Back<span>React patterns</span></h1>
          <p>Seamless Video Mnagement Elevated Results.</p>
        </div>
        <button className='button btn-color' onClick={() => setShowModel(true)}>Upload video</button>
      </div>
      <div className='s-flex'>
        <div className='s-card-1 s-card'>
          <div className='s-f-c'><span className='s-icon'><MdOutlineRemoveRedEye /></span>
            <span className='s-title'>Total views</span></div>
          <h2>{channelStats?.totalVideoViews}</h2>
        </div>
        <div className='s-card-2 s-card'>
          <div className='s-f-c'><span className='s-icon'><CiUser /></span>
            <span className='s-title'>Total subsscribers</span></div>
          <h2>{channelStats?.totalSubscribers}</h2>
        </div>
        <div className='s-card-3 s-card'>
          <div className='s-f-c'>
            <span className='s-icon'><CiHeart /></span>
            <span className='s-title'>Total likes</span>
          </div>
          <h2>{channelStats?.totalLikes}</h2>
        </div>
      </div>
      <div className='my-video-container'>
        <div className='my-card-header'>
          <h4>Status</h4>
          <h4>Status</h4>
          <h4>Uploaded</h4>
          <h4>Rating</h4>
          <h4>Date uploaded</h4>
        </div>
        {
          channelVideos.length === 0 ? "No video found"
            : channelVideos.map((video, index) => {
              return (
                <div className='my-card-data' key={index}>
                  <input className='width-16' type="checkbox" checked={video.isPublished} />
                  <span className='width-16 publish-status'>{video.isPublished ? <span className='published'>Published</span> : <span className='unpublished'>Unpublished</span>}</span>
                  <div className='width-16 my-video-info'><img src={video.thumbnail} /><span>{video.title.slice(0, 30) + "..."}</span></div>
                  <div className='width-16 l-d-f'><span className='l-likes'>102 liked</span><span className='l-dislikes'>45 dislikes</span></div>
                  <p className='width-16'>{video.createdAt.slice(0, 10)}</p>
                  <div className='l-delete-update width-16'>
                    <span className='width-16 l-delete' onClick={() => deleteVideo(video._id)}><MdDelete /></span>
                    <span className='width-16 l-update' onClick={() => updateVideoHandler(video._id)} ><FaPen /></span>
                  </div>
                </div>
              )
            })
        }
      </div>
      {showModel && <UploadVideo 
      closeShowModel={closeShowModel} 
      setShowLoadingModel={setShowLoadingModel} />}

      {showLoadingModel && <Uploading closeLoading={closeLoading} />}

      {updateFlag && <EditVideo 
        setUpdateFlag={setUpdateFlag}
        thumbnail={thumbnail}
        title={title} 
        description={description} 
        setDescription={setDescription} 
        setTitle={setTitle}  
        setThumbnail={setThumbnail} 
        videoId={videoId} />}
    </Layout>
  )
}

export default AdminDashboard