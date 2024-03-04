import React, {useState, useEffect} from 'react'
import { useApp } from "../contextAPI/appcontext";

const VideoSuggesion = () => {

  const { videos, apigetAllVideos, apigetVideoById } = useApp();
  let page = 1;
  let limit = 10;
  useEffect(() => {
    const getAllVideos = async () => {
      await apigetAllVideos(page, limit);
    }
    getAllVideos()
  }, [])


  // console.log("videos", videos)
  const handleOnCardClick = async (videoId) => {
    await apigetVideoById(videoId);
  } 
  // console.log(video);
  return (
    <div className='video-suggestion-container'>
      {
        videos.length === 0 ? "No video found" :
        videos.map((video, index) => {
          return(
            <div key={index} className='video-suggestion-card' onClick={() => handleOnCardClick(video._id)}>
              <img className='v-s-card-img' src={video.thumbnail} alt='video suggestion'/>
              <div>
                <p className='v-card-title'>{video.title.length > 30 ? video.title.slice(0,30)+"...":video.title}</p>
                <p className='m-1'>{video.owner.fullName}</p>
                <p>{video.views}views 1 min ago</p>
              </div>
            </div>
          );
        })
      }
    </div>
  )
}

export default VideoSuggesion