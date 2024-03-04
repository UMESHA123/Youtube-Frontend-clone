import React, {useEffect} from 'react'
import { useApp } from "../contextAPI/appcontext";
import Layout from '../Layout/Layout';
const WatchHistory = () => {

    const { apigetWatchHistry, watchHistry, apigetVideoById } = useApp();
    useEffect(() => {
        try{
          const getWatchHistoryFrontend = async() => {
            await apigetWatchHistry();
          }
          getWatchHistoryFrontend()
        
        }catch(error){
          console.log(error);
        }
      }, []);
      const handleOnCardClick = async (videoId) => {
        await apigetVideoById(videoId);
      } 
      console.log(watchHistry)
  return (
    <Layout>
        
    </Layout>
  )
}

export default WatchHistory