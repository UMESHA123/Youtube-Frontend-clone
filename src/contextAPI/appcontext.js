import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { requestHandler, LocalStorage } from "../utils";
import Loader from "../components/Loader";

import { 
    refreshToken, 
    changePassword,
    getCurrentUser,
    updateAccount,
    updateAvatar,
    updateCoverImage,
    getWatchHistry,
    getUserChannelProfile,
    getAllVideos,
    publishVideo,
    getVideoById,
    deleteVideo,
    updateVideo,
    togglePublishStatus,
    createTweet,
    getUserTweets, 
    updateTweet,
    deleteTweet,
    getSubscribedChannels,
    toggleSubscription,
    subscribedStatus,
    getUserChannelSubscribers,
    createPlaylist,
    getUserPlaylists,
    getPlaylistBYId,
    updatePlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos,
    getLikedVideoStatus,
    getLikedCommentStatus,
    getLikedTweetStatus,
    healthCheck,
    getChannelStats,
    getChannelVideos,
    getVideoComment,
    addComment,
    deleteComment,
    updateComment,
    getMyUserChannelProfile,
    getAllMyVideos
} from "../api";

const AppContext = createContext({
    currentUser: null,
    watchHistry: [],
    userChannelProfile: null,
    myUserChannelProfile: null,
    videos: [],
    video: null,
    videoDetails: null,
    videoPublishStatus: false,
    userTweets: [],
    subscrobedChannels: null,
    subscriptionStatus: false,
    userChannelSubscribers: null,
    userPlaylists: [],
    userPlaylist: null,
    likedVideos: [],
    likedVideoStatus: false,
    likedCommentStatus: false,
    likedTweetStatus: false,
    channelStats: null,
    channelVideos: [],
    videoComments: [],
    userMyChannelProfile: null,
    myChannelVideos: [],
    videoPublished: false,
    apirefreshToken: async () => {},
    apichangePassword: async () => {},
    apigetCurrentUser: async () => {},
    apiupdateAccount: async () => {},
    apiupdateAvatar: async () => {},
    apiupdateCoverImage: async () => {},
    apigetWatchHistry: async () => {},
    apigetUserChannelProfile: async () => {},
    apigetAllVideos: async () => {},
    apipublishVideo: async () => {},
    apigetVideoById: async () => {},
    apideleteVideo: async () => {},
    apiupdateVideo: async () => {},
    apitogglePublishStatus: async () => {},
    apicreateTweet: async () => {},
    apigetUserTweets: async () => {},
    apiupdateTweet: async () => {},
    apideleteTweet: async () => {},
    apigetSubscribedChannels: async () => {},
    apitoggleSubscription: async () => {},
    apisubscribedStatus: async () => {},
    apigetUserChannelSubscribers: async () => {},
    apicreatePlaylist: async () => {},
    apigetUserPlaylists: async () => {},
    apigetPlaylistBYId: async () => {},
    apiupdatePlaylist: async () => {},
    apideletePlaylist: async () => {},
    apiaddVideoToPlaylist: async () => {},
    apiremoveVideoFromPlaylist: async () => {},
    apitoggleVideoLike: async () => {},
    apitoggleCommentLike: async () => {},
    apitoggleTweetLike: async () => {},
    apigetLikedVideos: async () => {},
    apigetLikedVideoStatus: async () => {},
    apigetLikedTweetStatus: async () => {},
    apigetLikedCommentStatus: async () => {},
    apihealthCheck: async () => {},
    apigetChannelStats: async () => {},
    apigetChannelVideos: async () => {},
    apigetVideoComment: async () => {},
    apiaddComment: async () => {},
    apideleteComment: async () => {},
    apiupdateComment: async () => {},
    apigetMyUserChannelProfile: async () => {},
    apigetAllMyVideos: async () => {},
    apigetVideoByIdDetails: async () => {},
})

const useApp = () => useContext(AppContext);

const AppProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [watchHistry, setWatchHistry] = useState([]);
    const [userChannelProfile, setUserChannelProfile] = useState(null);
    const [myUserChannelProfile, setMyUserChannelProfile] = useState(null);
    const [videos, setVideos] = useState([]);
    const [video, setVideo] = useState(null);
    const [videoDetails, setVideoDetails] = useState(null);
    const [videoPublishStatus, setVideoPublishStatus] = useState(false);
    const [userTweets, setUserTweets] = useState([]);
    const [subscrobedChannels, setSubscrobedChannels] = useState(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState(false);
    const [userChannelSubscribers, setUserChannelSubscribers] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [userPlaylist, setUserPlaylist] = useState(null);
    const [likedVideos, setLikedVideos] = useState([]);
    const [likedVideoStatus, setLikedVideoStatus] = useState(false);
    const [likedCommentStatus, setLikedCommentStatus] = useState(false);
    const [likedTweetStatus, setLikedTweetStatus] = useState(false);
    const [channelStats, setChannelStats] = useState(null);
    const [channelVideos, setChannelVideos] = useState([]);
    const [videoComments, setVideoComments] = useState([]);
    const [myChannelVideos, setMyChannelVideos] = useState([]);
    const [videoPublished, setVideoPublished] = useState(false);

    const navigate = useNavigate();

    const apirefreshToken = async () => {
        await requestHandler(
            async () => await refreshToken(),
            setIsLoading,
            () => {
                console.log("api heath is good....");
            },
            alert 
        );
    };

    const apichangePassword = async (old_password, password) => {
        await requestHandler(
            async () => await changePassword(old_password, password),
            setIsLoading,
            () => {
                alert('Password updated successfully.');
            },
            alert 
        );
    };
    
    const apigetCurrentUser = async () => {
        await requestHandler(
            async () => await getCurrentUser(),
            setIsLoading,
            (res) => {
                let {data} = res;
                setCurrentUser(data);
            },
            alert 
        );
    };
    const apiupdateAccount = async (fullName, email) => {
        await requestHandler(
            async () => await updateAccount(fullName, email),
            setIsLoading,
            () => {
                alert(`the personal details updated successfully`);
            },
            alert 
        );
    };
    const apiupdateAvatar = async (data) => {
        await requestHandler(
            async () => await updateAvatar(data),
            setIsLoading,
            () => {
                alert('Avatar updated successfully.');
            },
            alert 
        );
    };
    const apiupdateCoverImage = async (data) => {
        await requestHandler(
            async () => await updateCoverImage(data),
            setIsLoading,
            () => {
                alert('Cover image updated successfully');
            },
            alert 
        );
    };
    const apigetWatchHistry = async () => {
        await requestHandler(
            async () => await getWatchHistry(),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log("watch history", data);
                setWatchHistry(data);
            },
            alert 
        );
    };
    const apigetUserChannelProfile = async (username) => {
        await requestHandler(
            async () => await getUserChannelProfile(username),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log("userCHannelProfile",res);
                setUserChannelProfile(data);
                navigate("Channel")
            },
            alert  
        );
    };
    const apigetMyUserChannelProfile = async (username) => {
        await requestHandler(
            async () => await getMyUserChannelProfile(username),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log("MyuserCHannelProfile",res);
                setMyUserChannelProfile(data);
                navigate("MyChannel")
            },
            alert  
        );
    };
    const apigetAllVideos = async (page, limit) => {
        console.log(page, limit)
        await requestHandler(
            async () => await getAllVideos(page, limit),
            setIsLoading(true),
            (res) => {
                // console.log(res)
                let {data} = res;
                setVideos(data);
            },
            alert 
        );
    };
    const apigetAllMyVideos = async (page, limit, userId) => {
        await requestHandler(
            async () => await getAllMyVideos(page, limit, userId),
            setIsLoading(true),
            (res) => {
                // console.log(res)
                let {data} = res;
                setMyChannelVideos(data);
            },
            alert 
        );
    };

    const apipublishVideo = async (thumbnail, video, title, description) => {
        await requestHandler(
            async () => await publishVideo(thumbnail, video, title, description),
            setIsLoading,
            (res) => {
                setVideoPublishStatus(res.status);
                console.log("video published status",res);
                alert('Video is published.');
            },
            alert 
        );
    };
    const apigetVideoById = async (videoId) => {
        await requestHandler(
            async () => await getVideoById(videoId),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log(res)
                setVideo(data);
                navigate("/VideoDetails");
            },
            alert 
        );
    };
    const apigetVideoByIdDetails = async (videoId) => {
        await requestHandler(
            async () => await getVideoById(videoId),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log("video by id details",res)
                setVideoDetails(data);
            },
            alert 
        );
    };
    const apideleteVideo = async (videoId) => {
        await requestHandler(
            async () => await deleteVideo(videoId),
            setIsLoading,
            () => {
                alert('Video is deleted successfully');
            },
            alert 
        );
    };
    const apiupdateVideo = async (videoId, thumbnail, title, description) => {
        await requestHandler(
            async () => await updateVideo(videoId, thumbnail, title, description),
            setIsLoading,
            () => {
                alert('video updated successfully.');
            },
            alert 
        );
    };
    const apitogglePublishStatus = async (videoId) => {
        await requestHandler(
            async () => await togglePublishStatus(videoId),
            setIsLoading,
            () => {
                alert('Video publish is toggled');
            },
            alert 
        );
    };
    const apicreateTweet = async (data) => {
        await requestHandler(
            async () => await createTweet(data),
            setIsLoading,
            () => {
                alert('Tweet is created');
            },
            alert 
        );
    };
    const apigetUserTweets = async (userId) => {
        await requestHandler(
            async () => await getUserTweets(userId),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log("tweets",res);
                setUserTweets(data);
            },
            alert 
        );
    };
    const apiupdateTweet = async (tweetId, data) => {
        await requestHandler(
            async () => await updateTweet(tweetId, data),
            setIsLoading,
            () => {
                alert("Tweet is updated successfully");
            },
            alert 
        );
    };
    const apideleteTweet = async (tweetId) => {
        await requestHandler(
            async () => await deleteTweet(tweetId),
            setIsLoading,
            () => {
                alert('tweet is deleted successfully.');
            },
            alert 
        );
    };
    const apigetSubscribedChannels = async (channelId) => {
        await requestHandler(
            async () => await getSubscribedChannels(channelId),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log("subscribed cahnnels",data);
                setSubscrobedChannels(data);
            },
            alert 
        );
    };
    const apitoggleSubscription = async (channelId) => {
        await requestHandler(
            async () => await toggleSubscription(channelId),
            setIsLoading,
            (res) => {
                // console.log("toggle",res);
                alert('subscription toggled')
            },
            alert 
        );
    };
    const apisubscribedStatus = async (channelId) => {
        await requestHandler(
            async () => await subscribedStatus(channelId),
            setIsLoading,
            (res) => {
                // console.log(res)
                // console.log("data",data)
                setSubscriptionStatus(res.message.isSubscribed);
            },
            alert 
        );
    };
    const apigetUserChannelSubscribers = async (subscriberId) => {
        await requestHandler(
            async () => await getUserChannelSubscribers(subscriberId),
            setIsLoading,
            (res) => {
                let {data} = res;
                setUserChannelSubscribers(data);
            },
            alert 
        );
    };
    const apicreatePlaylist = async (data) => {
        await requestHandler(
            async () => await createPlaylist(data),
            setIsLoading,
            (res) => {
                console.log(res)
                alert('Playlist created successfully.');
            },
            alert 
        );
    };
    const apigetUserPlaylists = async (userId) => {
        await requestHandler(
            async () => await getUserPlaylists(userId),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log(res);
                setUserPlaylists(data);
            },
            alert 
        );
    };
    const apigetPlaylistBYId = async (playlistId) => {
        await requestHandler(
            async () => await getPlaylistBYId(playlistId),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log("playlist by id",res);
                setUserPlaylist(data);
                navigate("channel-playlist-page")
            },
            alert 
        );
    };
    const apiupdatePlaylist = async (playlistId, data) => {
        await requestHandler(
            async () => await updatePlaylist(playlistId, data),
            setIsLoading,
            () => {
                alert('Playlist is updated successfully.');
            },
            alert 
        );
    };
    const apideletePlaylist = async (playlistId) => {
        await requestHandler(
            async () => await deletePlaylist(playlistId),
            setIsLoading,
            () => {
                alert('Playlist is deleted successfully');
            },
            alert 
        );
    };
    const apiaddVideoToPlaylist = async (videoId, playlistId) => {
        await requestHandler(
            async () => await addVideoToPlaylist(videoId, playlistId),
            setIsLoading, 
            (res) => {
                console.log(res);
                alert('Video added to the playlist.');
            },
            alert 
        );
    };
    const apiremoveVideoFromPlaylist = async (videoId, playlistId) => {
        await requestHandler(
            async () => await removeVideoFromPlaylist(videoId, playlistId),
            setIsLoading,
            () => {
                alert("Video removed from the playlist");
            },
            alert 
        );
    };
    const apitoggleVideoLike = async (videoId) => {
        await requestHandler(
            async () => await toggleVideoLike(videoId),
            setIsLoading,
            () => {
                // console.log(res);
            },
            alert 
        );
    };
    const apitoggleCommentLike = async (commentId) => {
        await requestHandler(
            async () => await toggleCommentLike(commentId),
            setIsLoading,
            () => {

            },
            alert 
        );
    };
    const apitoggleTweetLike = async (tweetId) => {
        await requestHandler(
            async () => await toggleTweetLike(tweetId),
            setIsLoading,
            () => {

            },
            alert 
        );
    };
    const apigetLikedVideos = async () => {
        await requestHandler(
            async () => await getLikedVideos(),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log(res)
                setLikedVideos(data);
            },
            alert 
        );
    };
    const apigetLikedVideoStatus = async (videoId) => {
        await requestHandler(
            async () => await getLikedVideoStatus(videoId),
            setIsLoading,
            (res) => {
                // console.log("res",res);
                setLikedVideoStatus(res.data.isLiked);
            },
            alert 
        );
    };
    const apigetLikedCommentStatus = async (commentId) => {
        await requestHandler(
            async () => await getLikedCommentStatus(commentId),
            setIsLoading,
            (res) => {
                let {data} = res;
                setLikedCommentStatus(data);
            },
            alert 
        );
    };
    const apigetLikedTweetStatus = async (tweetId) => {
        await requestHandler(
            async () => await getLikedTweetStatus(tweetId),
            setIsLoading,
            (res) => {
                let {data} = res;
                setLikedTweetStatus(data);
            },
            alert 
        );
    };
    const apigetChannelStats = async () => {
        await requestHandler(
            async () => await getChannelStats(),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log("channel status", data)
                setChannelStats(data);
            },
            alert 
        );
    };
    const apigetChannelVideos = async () => {
        await requestHandler(
            async () => await getChannelVideos(),
            setIsLoading,
            (res) => {
                let {data} = res;
                console.log("channel videos",data)
                setChannelVideos(data);
            },
            alert 
        );
    };
    const apigetVideoComment = async (videoId) => {
        await requestHandler(
            async () => await getVideoComment(videoId),
            setIsLoading,
            (res) => {
                let {data} = res;
                setVideoComments(data);
            },
            alert 
        );
    };
    const apiaddComment = async (videoId, data) => {
        await requestHandler(
            async () => await addComment(videoId, data),
            setIsLoading,
            () => {
                alert('comment added successfully');
            },
            alert 
        );
    };
    const apideleteComment = async (commentId) => {
        await requestHandler(
            async () => await deleteComment(commentId),
            setIsLoading,
            () => {
                alert('comment deleted successfully');
            },
            alert 
        );
    };
    const apiupdateComment = async (commentId, data) => {
        await requestHandler(
            async () => await updateComment(commentId, data),
            setIsLoading,
            () => {
                alert('comment updated successfully');
            },
            alert 
        );
    };

    return (
        <AppContext.Provider value = {{
            currentUser,
            watchHistry,
            userChannelProfile,
            myUserChannelProfile,
            videos,
            video,
            videoDetails,
            videoPublishStatus,
            userTweets,
            subscrobedChannels,
            subscriptionStatus,
            userChannelSubscribers,
            userPlaylists,
            userPlaylist,
            likedVideos,
            likedVideoStatus,
            likedCommentStatus,
            likedTweetStatus,
            channelStats,
            channelVideos,
            videoComments,
            myChannelVideos,
            apirefreshToken,
            apichangePassword,
            apigetCurrentUser,
            apiupdateAccount,
            apiupdateAvatar,
            apiupdateCoverImage,
            apigetWatchHistry,
            apigetUserChannelProfile,
            apigetAllVideos,
            apipublishVideo,
            apigetVideoById,
            apideleteVideo,
            apiupdateVideo,
            apitogglePublishStatus,
            apicreateTweet,
            apigetUserTweets,
            apiupdateTweet,
            apideleteTweet,
            apigetSubscribedChannels,
            apitoggleSubscription,
            apisubscribedStatus,
            apigetUserChannelSubscribers,
            apicreatePlaylist,
            apigetUserPlaylists,
            apigetPlaylistBYId,
            apiupdatePlaylist,
            apideletePlaylist,
            apiaddVideoToPlaylist,
            apiremoveVideoFromPlaylist,
            apitoggleVideoLike,
            apitoggleCommentLike,
            apitoggleTweetLike,
            apigetLikedVideos,
            apigetLikedVideoStatus,
            apigetLikedTweetStatus,
            apigetLikedCommentStatus,
            apigetChannelStats,
            apigetChannelVideos,
            apigetVideoComment,
            apiaddComment,
            apideleteComment,
            apiupdateComment,
            apigetMyUserChannelProfile,
            apigetAllMyVideos,
            videoPublished,
            apigetVideoByIdDetails
        }}>
            {false ? <Loader isLoading={isLoading}/> : children}
            {/* {children} */}
        </AppContext.Provider>
    );

}   

export {
    AppContext,
    AppProvider,
    useApp
};