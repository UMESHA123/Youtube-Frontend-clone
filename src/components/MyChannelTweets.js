import React, {useEffect, useState } from 'react'
import { useApp } from '../contextAPI/appcontext'
import { useAuth } from '../contextAPI/auth';
import { MdDelete } from "react-icons/md";
import { MdTipsAndUpdates } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import img1 from "./img1.png";
const MyChannelTweets = () => {
    const {user} = useAuth();
    const {userTweets,apicreateTweet, apitoggleTweetLike,likedTweetStatus,apigetUserTweets, apiupdateTweet, apideleteTweet } = useApp();
    const [tweets, setTweets] = useState('');
    const [toggleTweetLike, setToggleTweetLike] = useState(false);
    const [tweetId, setTweetId] = useState('');
    const [updateTweetFlag, setUpdateTweetFlag] = useState(false);

    useEffect(() => {
        const getAllTweets = async () => {
            await apigetUserTweets(user._id);
        }
        getAllTweets();
    },[toggleTweetLike])

    const tweetLikeHandler = async (tweet_Id) => {
        setTweetId(tweet_Id);
        await apitoggleTweetLike(tweetId);
        setToggleTweetLike(!toggleTweetLike);
    }

    const createTweets = async () => {
        if(updateTweetFlag){
            await apiupdateTweet(tweetId, tweets);
        }else{
            await apicreateTweet(tweets);
        }
        setTweets('')
       setToggleTweetLike(!toggleTweetLike);
    }

    const tweetUpdateHandler = (tweet_Id) => {
        setUpdateTweetFlag(true);
        setTweetId(tweet_Id);
    }
    const tweetDeleteHandler = async (tweet_id) => {
        await apideleteTweet(tweet_id);
        setToggleTweetLike(!toggleTweetLike);
    }
    return (
    <div className='tweet-container'>
        <div className='tweet-input'>
            <textarea type='text' placeholder='Create a tweet...'value={tweets} onChange={(e) => setTweets(e.target.value)}></textarea>
            <button className='p-absolute button btn-color' onClick={createTweets}>{updateTweetFlag?"Edit":'Add'}</button>
        </div>
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
                                <span className="cursor" onClick={() => tweetUpdateHandler(tweet._id, tweet.content)}><MdTipsAndUpdates/></span>
                                <span className="cursor" onClick={() => tweetDeleteHandler(tweet._id)}><MdDelete/></span>
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

export default MyChannelTweets