import React from 'react'
import { useApp } from '../contextAPI/appcontext'

const ChannelVideos = () => {
    const { videos, apigetVideoById } = useApp()
    const handleOnCardClick = async (videoId) => {
        await apigetVideoById(videoId);
    }
    return (
        <div>
            <div className='v-card-container'>
                {
                    videos.length === 0 ? "no videos found"
                        : videos.map((video, index) => {
                            return (
                                <div className='v-card' key={index} onClick={() => handleOnCardClick(video._id)}>
                                    <img className='thumbnail' src={video.thumbnail} alt='video thumbnail' />
                                    <div className='c-card-body'>
                                        <img className='v-card-owner-avatar' src={video.owner.avatar} alt='video owner' />
                                        <div className='v-card-info'>
                                            <p className='v-card-title'>{video.title.length > 30 ? video.title.slice(0, 30) + "..." : video.title}</p>
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
        </div>
    )
}

export default ChannelVideos