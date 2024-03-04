import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Channel from './pages/Channel';
import EditPersonalInfo from './pages/EditPersonalInfo';
import Home from './pages/Home';
import VideoDetail from './pages/VideoDetail';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DefaultPage from './pages/DefaultPage';
import { AuthProvider, useAuth } from "./contextAPI/auth"
import PublicRoute from './publicRoute/PublicRoute';
import { AppProvider } from './contextAPI/appcontext';
// import ChannelVideos from './components/ChannelVideos';
import ChannelPlaylist from "./components/ChannelPlaylist";
import ChannelTweets from "./components/ChannelTweets";
import ChannelSubscribers from "./components/ChannelSubscribers";
import MyChannel from './pages/MyChannel';
import MyChannelVideo from './components/MyChannelVideo';
import PublicMyChannelVideo from './components/PublicMyChannelVideo';
import MyChannelTweets from './components/MyChannelTweets';
import MyChannelPlaylist from './components/MyChannelPlaylist';
import ChannelPlaylistPage from './pages/ChannelPlaylistPage';
import LIkedVideoPage from './pages/LIkedVideoPage';
import WatchHistory from './pages/WatchHistory';
import PersonalInformation from './components/PersonalInformation';
import ChannelInformation from './components/ChannelInformation';
import ChangePassword from './components/ChangePassword';
import ChannelSubscribed from './components/ChannelSubscribed';


function App() {

  const { token, user } = useAuth();

  return (

    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/' element={
              token && user?._id ? (<Navigate to="/home" />) : (<Navigate to="/login" />)
            }></Route>

            {/* public routes */}
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
            <Route path='/TermsAndConditions' element={<PublicRoute><TermsAndConditions /></PublicRoute>} />
            <Route path='/PrivacyPolicy' element={<PublicRoute><PrivacyPolicy /></PublicRoute>} />

            {/* private routes */}

            <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="adminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path='Channel' element={<ProtectedRoute><Channel /></ProtectedRoute>} >
              <Route path='channel-videos' element={<PublicMyChannelVideo/>}/>
              <Route path='channel-playlists' element={<ChannelPlaylist/>}/>
              <Route path='channel-tweets' element={<ChannelTweets/>}/>
              <Route path='channel-subscribers' element={<ChannelSubscribed/>}/>
            </Route>
            <Route path='EditPersonalInfo' element={<ProtectedRoute><EditPersonalInfo /></ProtectedRoute>} />
            <Route path='VideoDetails' element={<ProtectedRoute><VideoDetail /></ProtectedRoute>} />
            <Route path='/MyChannel' element={<ProtectedRoute><MyChannel/></ProtectedRoute>}>
              <Route path='Mychannel-videos' element={<MyChannelVideo/>}/>
              <Route path='Mychannel-playlists' element={<MyChannelPlaylist/>}/>
              <Route path='Mychannel-tweets' element={<MyChannelTweets/>}/>
              <Route path='Mychannel-subscribers' element={<ChannelSubscribers/>}/>
              <Route path='personal-information' element={<PersonalInformation/>}/>
              <Route path='channel-information' element={<ChannelInformation/>}/>
              <Route path='change-password' element={<ChangePassword/>}/>
            </Route>
            <Route path='channel-playlist-page' element={<ProtectedRoute><ChannelPlaylistPage/></ProtectedRoute>}/>
            <Route path='/liked-videos' element={<ProtectedRoute><LIkedVideoPage/></ProtectedRoute>}/>
            <Route path='/watch-history' element={<ProtectedRoute><WatchHistory/></ProtectedRoute>}/>
            <Route path="/admin-dashbord" element = {<ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>
            {/* default page */}
            <Route path='*' element={<DefaultPage />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
