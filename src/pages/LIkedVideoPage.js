import React, {useEffect} from 'react'
import { useApp } from "../contextAPI/appcontext";
import Layout from '../Layout/Layout';
const LIkedVideoPage = () => {
    const { apigetLikedVideos, likedVideos, apigetVideoById } = useApp();
    useEffect(() => {
        try{
          const getLikedVideosFrontend = async() => {
            await apigetLikedVideos();
          }
          getLikedVideosFrontend()
        
        }catch(error){
          console.log(error);
        }
      }, []);
      const handleOnCardClick = async (videoId) => {
        await apigetVideoById(videoId);
      } 
  return (
    <Layout>
        <div className='v-card-container'>
        {
          likedVideos.length === 0 ? "no videos found"
          : likedVideos.map((video,index) => {
            return(
              <div className='v-card' key={index} onClick={() => handleOnCardClick(video.video._id)}>
                <img className='thumbnail' src={video.video.thumbnail} alt='video thumbnail'/>
                <div className='c-card-body'>
                  <img className='v-card-owner-avatar' src={video.video.owner.avatar} alt='video owner'/>
                  <div className='v-card-info'>
                    <p className='v-card-title'>{video.video.title.length > 30 ? video.video.title.slice(0,30)+"...":video.video.title}</p>
                    <div className="flex">
                      <p className='v-card-views'>{video.video.views} views</p>
                      <p className='v-card-publish'>10 min</p>
                    </div>
                    <p className='v-card-owner'>{video.video.owner.fullName}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div> 
    </Layout>
  )
}

export default LIkedVideoPage