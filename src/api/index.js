import axios from 'axios';
import { LocalStorage } from "../utils";
// import { useAuth } from '../contextAPI/auth';


const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    timeout: 120000,
});

apiClient.interceptors.request.use(
    function (config) {
        // const {dataType} = useAuth();
        
        const token = LocalStorage.get("token");
        config.headers.Authorization = `Bearer ${token}`;
        // if(dataType !== "json"){
        //     config.headers['Content-Type'] = 'multipart/form-data';
        // }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

//user routes 
const loginUser = (email, username, password) => {
    // console.log("index.js",email, username, password)

    return apiClient.post("/users/login", {email, username, password});
};

const registerUser = (data) => {
    return apiClient.post("users/register", data);
}

const logoutUser = () => {
    return apiClient.post("users/logout");
}

const refreshToken = () => {
    return apiClient.post("users/refresh-token");
}

const changePassword = (old_password, password) => {
    return apiClient.post("users/change-password", {oldPassword: old_password, newPassword: password});
}

const getCurrentUser = () => {
    return apiClient.get("users/current-user");
}
const updateAccount = (fullName, email) => {
    return apiClient.patch("users/update-account",{fullName, email});
}

const updateAvatar = (data) => {
    return apiClient.patch("users/avatar", data)
}
const updateCoverImage = (data) => {
    return apiClient.patch("users/cover-image", data);
}
const getWatchHistry = () => {
    return apiClient.get("users/history");
}
const getUserChannelProfile = (username) => {
    return apiClient.get(`users/c/${username}`);
}
const getMyUserChannelProfile = (username) => {
    return apiClient.get(`users/c/${username}`);
}
// video routesuserId
const getAllMyVideos = (page, limit, userId) => {
    return apiClient.get(`videos/?userId=${userId}`);
    // return apiClient.get(`videos/?page=${data.page}&${data.limit}&${data.sortBy}&${data.userId}`);
}
const getAllVideos = (page, limit) => {
    return apiClient.get(`videos/`);

    // return apiClient.get(`videos/?page=${data.page}&${data.limit}&${data.sortBy}&${data.userId}`);
}
// const getAllVideos = (d) => {
//     return apiClient.get(`videos/`, d);
// }
const publishVideo = (thumbnail, video, title, description) => {
    const formData = new FormData();
    formData.append("videoFile", video)
    formData.append("thumbnail", thumbnail)
    formData.append("title", title)
    formData.append("description", description)

    return apiClient.post('videos/',formData)
}
const getVideoById = (videoId) => {
    return apiClient.get(`videos/${videoId}`)
}
const deleteVideo = (videoId) => {
    return apiClient.delete(`videos/${videoId}`)
}
const updateVideo = (videoId, thumbnail, title, description) => {
    const formData = new FormData();
        
    formData.append("thumbnail", thumbnail)
    formData.append("title", title)
    formData.append("description", description)

    return apiClient.patch(`videos/${videoId}`, formData);
}
const togglePublishStatus = (videoId) => {
    return apiClient.patch(`videos/toggle/publish/:${videoId}`)
}

//tweet route
const createTweet = (data) => {
    return apiClient.post(`tweets/`, {content:data});
}
const getUserTweets = (userId) => {
    return apiClient.get(`tweets/user/${userId}`);
}
const updateTweet = (tweetId, data) => {
    return apiClient.patch(`tweets/${tweetId}`, {content:data});
}
const deleteTweet = (tweetId) => {
    return apiClient.delete(`tweets/${tweetId}`);
}

//subscription route
const getSubscribedChannels = (channelId) => {
    return apiClient.get(`subscriptions/c/${channelId}`)
}
const toggleSubscription = (channelId) => {
    return apiClient.post(`subscriptions/c/${channelId}`)
}
const subscribedStatus = (channelId) => {
    return apiClient.get(`subscriptions/channel/${channelId}`);
}
const getUserChannelSubscribers = (subscriberId) => {
    return apiClient.get(`subscriptions/u/${subscriberId}`);
}

//playlist controllers
const createPlaylist = (data) => {
    return apiClient.post(`playlist/`, {name: data.name, description: data.description});
}
const getUserPlaylists = (userId) => {
    return apiClient.get(`playlist/user/${userId}`);
}
const getPlaylistBYId = (playlistId) => {
    return apiClient.get(`playlist/${playlistId}`);
}
const updatePlaylist = (playlistId, data) => {
    return apiClient.patch(`playlist/${playlistId}`, {name: data.name, description: data.description});
}
const deletePlaylist = (playlistId) => {
    return apiClient.delete(`playlist/${playlistId}`);
}
const addVideoToPlaylist = (videoId, playlistId) => {
    return apiClient.patch(`playlist/add/${videoId}/${playlistId}`);
}
const removeVideoFromPlaylist = (videoId, playlistId) => {
    return apiClient.patch(`playlist/remove/${videoId}/${playlistId}`);
}

//like route
const toggleVideoLike = (videoId) => {
    return apiClient.post(`likes/toggle/v/${videoId}`);
}
const toggleCommentLike = (commentId) => {
    return apiClient.post(`likes/toggle/c/${commentId}`);
}
const toggleTweetLike = (tweetId) => {
    return apiClient.post(`likes/toggle/t/${tweetId}`);
}
const getLikedVideos = () => {
    return apiClient.get(`likes/videos`);
}
const getLikedVideoStatus = (videoId) => {
    return apiClient.get(`likes/video/like/s/${videoId}`);
}
const getLikedTweetStatus = (tweetId) => {
    return apiClient.get(`likes/tweet/like/s/${tweetId}`);
}
const getLikedCommentStatus = (commentId) => {
    return apiClient.get(`likes/comment/like/s/${commentId}`);
}

//helthcheck route 
const healthCheck = () => {
    return apiClient.get('healthcheck/');
}

//dashboard route 
const getChannelStats = () => {
    return apiClient.get('dashboard/stats');
}
const getChannelVideos = () => {
    return apiClient.get('dashboard/videos');
}

//comment route 
const getVideoComment = (videoId) => {
    return apiClient.get(`comments/${videoId}`);
}
const addComment = (videoId, data) => {
    return apiClient.post(`comments/${videoId}`, {content: data});
}
const deleteComment = (commentId) => {
    return apiClient.delete(`comments/c/${commentId}`);
}
const updateComment = (commentId, data) => {
    return apiClient.patch(`comments/c/${commentId}`, {content: data});
}

export {
    loginUser,
    registerUser,
    logoutUser,
    refreshToken,
    changePassword,
    getCurrentUser,
    updateAccount,
    updateAvatar,
    updateCoverImage,
    getUserChannelProfile,
    getWatchHistry,
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
    getLikedTweetStatus,
    getLikedCommentStatus,
    healthCheck,
    getChannelStats,
    getChannelVideos,
    getVideoComment,
    addComment,
    deleteComment,
    updateComment,
    getMyUserChannelProfile,
    getAllMyVideos,
}