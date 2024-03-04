import React from 'react'
import Layout from '../Layout/Layout'
import VideoDetailsLayout from '../Layout/VideoDetailsLayout'
import { useApp } from '../contextAPI/appcontext'
import VideoInfo from '../components/VideoInfo'
import VideoComment from "../components/VideoComment";
import VideoSuggesion from '../components/VideoSuggesion'
const VideoDetail = () => {
  const { video } = useApp();
  return (
    <Layout>
      <VideoDetailsLayout>
        <div className='video-container'>
          <video src={video.videoFile} controls></video>
        </div>
        <div className='video-info'><VideoInfo/></div>
        <div className='video-comment'><VideoComment videoId = {video._id}/></div>
        <div className='video-suggesion'><VideoSuggesion/></div>
      </VideoDetailsLayout>
    </Layout>
  )
}

export default VideoDetail