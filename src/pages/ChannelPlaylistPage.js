import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
// import img1 from "./img1.png";
import { useApp } from '../contextAPI/appcontext';
import PlaylistVideoLayout from "../Layout/PlaylistVideoLayout";
import { MdDelete } from "react-icons/md";

const ChannelPlaylistPage = () => {
    const {apigetVideoById, userPlaylist, apiremoveVideoFromPlaylist } = useApp();

    // useEffect(() => {
    //     const getUserProfile = async () => {
    //         await apigetUserChannelProfile(userPlaylist.owner)
    //     }
    //     getUserProfile()
    // },[])
    const handleOnCardClick = async (videoId) => {
        await apigetVideoById(videoId);
      }
    const removeVideoFromPlaylist = async(video_id, playlist_id) => {
        await apiremoveVideoFromPlaylist(video_id, playlist_id);
    } 
    return (
        <Layout>
            <PlaylistVideoLayout>
                <div className='playlist-left'>
                    <div className='v-card rounded'>
                        <div className='p-r-card-container'>
                            <img className='thumbnail rounded' src={userPlaylist.videos[0].thumbnail} alt='playlist thumbnail' />
                            <div className='overlay-card'></div>
                        </div>
                        <div className='p-card-body'>
                            <p className='playlist-name'>{userPlaylist.name}</p>
                            <p className='playlist-description'>{userPlaylist.description.length >= 150 ? userPlaylist.description.slice(0, 150) + "..." : userPlaylist.description}</p>
                        </div>

                    </div>
                    <div className='display-flex'>
                        <img className='playlist-u-avatar' src={userPlaylist.owner.avatar} alt='user avatar img' />
                        <div><p className='channel-name'>{userPlaylist.owner.username}</p>
                        <p className='channel-user-name'>@{userPlaylist.owner.fullName}</p>
                        </div>
                    </div>
                </div>
                <div className='playlist-right'>
                    <div className='v-card-container'>
                        {
                            userPlaylist.videos.map((video, index) => {
                                return (
                                    <div className='v-card' key={index} onClick={() => handleOnCardClick(video._id)}>
                                        <img className='thumbnail rounded' src={video.thumbnail} alt='video thumbnail' />
                                        <div className='c-card-body'>
                                            <img className='v-card-owner-avatar' src={userPlaylist.owner.avatar} alt='video owner' />
                                            <div className='v-card-info'>
                                                <p className='v-card-title'>{video.title.length > 30 ? video.title.slice(0, 30) + "..." : video.title}</p>
                                                <div className="flex">
                                                    <p className='v-card-views'>{video.views} views</p>
                                                    <p className='v-card-publish'>10 min</p>
                                                </div>
                                                <p className='v-card-owner'>{userPlaylist.owner.fullName}</p>
                                                
                                            </div>
                                        </div>
                                        <span onClick={() => removeVideoFromPlaylist(video._id,userPlaylist._id)}><MdDelete/></span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </PlaylistVideoLayout>
        </Layout>
    )
}

export default ChannelPlaylistPage