import React, {useEffect} from 'react'
import { useApp } from '../contextAPI/appcontext';
import { useAuth } from '../contextAPI/auth';

const MyChannelVideo = () => {
    const {user} = useAuth();
    const { apigetVideoById, apigetAllMyVideos, myChannelVideos} = useApp();
    useEffect(() => {
        const getAllMyVideos = async () => {
          console.log("my user id",user._id)
          await apigetAllMyVideos(1,10, user._id);
        }
        getAllMyVideos()
      }, [])
    const handleOnCardClick = async (videoId) => {
        await apigetVideoById(videoId);
      } 
  return (
    <div className='v-card-container'>
        {
          myChannelVideos.length === 0 ? "no Videos found"
          : myChannelVideos.map((video,index) => {
            return(
              <div className='v-card' key={index} onClick={() => handleOnCardClick(video._id)}>
                <img className='thumbnail' src={video.thumbnail} alt='video thumbnail'/>
                <div className='c-card-body'>
                  <img className='v-card-owner-avatar' src={video.owner.avatar} alt='video owner'/>
                  <div className='v-card-info'>
                    <p className='v-card-title'>{video.title.length > 30 ? video.title.slice(0,30)+"...":video.title}</p>
                    <div className="flex">
                      <p className='v-card-views'>{video.views} views</p>
                      <p className='v-card-publish'>10 min</p>
                    </div>
                    <p className='v-card-owner'>{video.owner.fullName}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div> 
  )
}

export default MyChannelVideo