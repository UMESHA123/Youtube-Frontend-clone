import React, {useEffect, useState } from 'react'
import { useApp } from '../contextAPI/appcontext'
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import img1 from "./img1.png";
const ChannelTweets = () => {
    // const {user} = useAuth();
    const {userTweets, apitoggleTweetLike,likedTweetStatus,apigetUserTweets, userChannelProfile } = useApp();
    // const [tweets, setTweets] = useState('');
    // const [toggleTweetLike, setToggleTweetLike] = useState(false);
    const [tweetId, setTweetId] = useState('');
 

    useEffect(() => {
        const getAllTweets = async () => {
            await apigetUserTweets(userChannelProfile._id);
        }
        getAllTweets();
    },[])

    const tweetLikeHandler = async (tweet_Id) => {
      setTweetId(tweet_Id);
      await apitoggleTweetLike(tweetId);
      
  }

  return (
    <div className='tweet-container'>
        
        <div className='tweet-container-body'>
        {
            userTweets.length === 0 ? "no tweets are found":
            userTweets.map((tweet, index) => {
                return(
                    <div key={index} className='tweet-container flex-row gap-2'>
                        <img className='v-card-owner-avatar' src={img1} alt='tweet owner avatar'/>
                        <div>
                            <p className='comment-owner-fullname'>{tweet.owner?.fullName}</p>
                            <p className='comment-body'>{tweet.content}</p>
                            <div className='comment-crud'>
                                <span  onClick={() => tweetLikeHandler(tweet._id)} className={`font-size-2 cursor ${likedTweetStatus?'liked-color':''}`}>{likedTweetStatus?<BiSolidLike/>: <BiLike/>}</span>
                                {/* <span className="cursor" onClick={() => tweetUpdateHandler(tweet._id, tweet.content)}><MdTipsAndUpdates/></span>
                                <span className="cursor" onClick={() => tweetDeleteHandler(tweet._id)}><MdDelete/></span> */}
                            </div>
                        </div>
                    </div>
                );
            })
        }
        </div>
    </div>
  )
}

export default ChannelTweets