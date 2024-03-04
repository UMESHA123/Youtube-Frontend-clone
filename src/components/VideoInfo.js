import React,{ useState, useEffect } from 'react'
import { useAuth } from '../contextAPI/auth';
import { useApp } from '../contextAPI/appcontext'
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
const VideoInfo = () => {
  const { userPlaylists,apigetUserPlaylists, apiaddVideoToPlaylist,apigetUserChannelProfile, userChannelProfile, video, apitoggleSubscription, apisubscribedStatus, subscriptionStatus, apitoggleVideoLike, apigetLikedVideoStatus, likedVideoStatus} = useApp();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [channelId, setChannelId] = useState(video.owner._id);
  const [videoId, setVideoId] = useState(video._id);
  const [likedToggle,setLikedToggle] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [playlistID, setPLaylistID] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const {user} = useAuth();
  // console.log(channelId)
  const [toggleState, setToggleState] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubscription = async () => {
    await apitoggleSubscription(`${channelId}`);
    setToggleState(!toggleState);
  } 
  
  useEffect(() => {
    try {
      const getSubscriptionstatus = async () => {
        await apisubscribedStatus(channelId);
      }
      getSubscriptionstatus()
    } catch (error) {
      console.log(error);
    }
  },[channelId, toggleState])


  const handleVideoLike = async () => {
    await apitoggleVideoLike(videoId);
    setLikedToggle(!likedToggle);
  }

  useEffect(() => {
    try {
      const getlikedVideostates = async () => {
        await apigetLikedVideoStatus(videoId);
      }
      getlikedVideostates();
    } catch (error) {
      console.log(error);
    }
  },[videoId,likedToggle])


  const getUserChannelHandler = async (username) => {
    await apigetUserChannelProfile(username);
  }
  const saveVideoHandler = async () => {
    setShowModel(true);
    await apigetUserPlaylists(user._id)

  }
  const closeModel = () => setShowModel(false);

  const handleChange = (e) => {
    const {value, checked} = e.target;
    console.log(value, checked);
    setPLaylistID(value);
    setIsChecked(checked);
  }
  const addVideoToPlaylist = async (video_id) => {
    await apiaddVideoToPlaylist(video_id, playlistID)
    setShowModel(false);
  }
  return (
    <div className='video-info video-info-border'>
      <div className={`${windowWidth <= 1100? 'flex-wrap':  'flex-row'} spc-btn`}>
        <div className='flex-col'>
          <p className='video-info-title'>{video.title}</p>
          <div className='flex-row gap-1'>
            <p>{video.views} views</p>
            <p>14 min</p>
          </div>
        </div>
        <div className={`flex-row align-center ${windowWidth <= 1100 ? 'm-2': ""}`}>
          <div className='like-dislike'>
            <button ><div className='align-item' onClick={() => handleVideoLike()}><span className={`font-size-2 ${likedVideoStatus?"liked-color": ""}`}>{likedVideoStatus?<BiSolidLike/>:<BiLike/>}</span><span className='like-count'>{video.likes}</span></div></button>
            <button><div className='align-item'><span className='font-size-2'><BiDislike/></span><span>29</span></div></button>
          </div>
          <div className='p-r-for-playlist'>
            <button className='button' onClick={() => saveVideoHandler()}>Save</button>
            {showModel && <div className='create-playlist-and-add-video'>
              <div className="checkbox-container">
                {
                  userPlaylists.length ===0 ? "No playList Found":
                  userPlaylists.map((playlist, index) => {
                    return (
                      <div key={index}>
                        <input type='checkbox' name='userPlaylist' value={playlist._id} onChange={handleChange}/>
                        <label className='label'>{playlist.name}</label>
                      </div>
                    );
                  })
                }
              </div>
              <div className='f-btn'>
                <button className = "button" onClick={closeModel}>Close</button>
                <button className='button' onClick={() => addVideoToPlaylist(video._id)}>Add Video</button>
              </div>

              </div>}
          </div>

        </div>
      </div>
      <div className='flex-row spc-btn channel cursor' onClick={() => getUserChannelHandler(video.owner.username)}>
        <div className='flex-row channel-video gap-1'>
          <img className='v-card-owner-avatar' src={video.owner.avatar} alt='channel-user-avatar'/>
          <div className='flex-column'>
            <p className='v-card-title'>{video.title}</p>
            <p>{userChannelProfile?.subscribersCount} Subscribers</p>
          </div>
        </div>
        <button className={`button ${!subscriptionStatus?"":"btn-color"}`} onClick={handleSubscription}>{!subscriptionStatus?"Subscribed":"subscribe"}</button>
      </div>
      <div className='video-description'>
        <p>{video.description}</p>
      </div>
    </div>
  )
}

export default VideoInfo