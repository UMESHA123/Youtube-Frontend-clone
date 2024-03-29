import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useApp } from "../contextAPI/appcontext";
import { MdLibraryMusic } from 'react-icons/md';
// import { useAuth } from '../contextAPI/auth';

const Home = () => {

  const { videos, apigetAllVideos, apigetVideoById } = useApp();
  // const {user} = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    try{
      const getAllPublicVideos = async() => {
        await apigetAllVideos(page, limit);
      }
      getAllPublicVideos()
    
    }catch(error){
      console.log(error);
    }
  }, [limit])
  const loadMoreVideos = () => {
    setPage(page+1);
    setLimit(limit);
   console.log(page)
  }

  // console.log("videos", videos)
  const handleOnCardClick = async (videoId) => {
    await apigetVideoById(videoId);
  } 
  // console.log(video);


  return (
    <Layout>
      <div className='v-card-container'>
        {
          videos.length === 0 ? "no videos found"
          : videos.map((video,index) => {
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
        <div className='center'><button onClick={() => loadMoreVideos()} className="button color-btn">Load more</button></div>
      </div> 
    </Layout>
  )
}

export default Home