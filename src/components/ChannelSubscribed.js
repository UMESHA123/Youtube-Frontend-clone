import React, {useEffect} from 'react'
import { useApp } from '../contextAPI/appcontext'

const ChannelSubscribed = () => {
    const {userChannelProfile, apigetSubscribedChannels, subscrobedChannels} = useApp()
  
    useEffect(() => {
        const getChannelSubscribed = async () => {
            await apigetSubscribedChannels(userChannelProfile._id);
        }
        getChannelSubscribed()
    },[userChannelProfile._id])
    console.log(subscrobedChannels)
    return (
    <div>ChannelSubscribed</div>
  )
}

export default ChannelSubscribed