import React from 'react'
import { RiHome6Line } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { RiHistoryLine } from "react-icons/ri";
import { FiVideo } from "react-icons/fi";
import { MdFolderOpen } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { IoSettingsSharp } from "react-icons/io5";
import { MdContactSupport } from "react-icons/md";
import { useApp } from '../contextAPI/appcontext';
import { useAuth } from '../contextAPI/auth';

export const sidebar_data = [
  {
    icon: <RiHome6Line />,
    title: 'Home',
    link: "/Home"
  },
  {
    icon: <BiLike />,
    title: "Liked Videos",
    link: "/liked-videos"
  },
  {
    icon: <RiHistoryLine />,
    title: "History",
    link: "/watch-history"
  },
  {
    icon: <FiVideo />,
    title: "Admin Dashboard",
    link: "/admin-dashbord"
  },
  {
    icon: <MdFolderOpen />,
    title: "Collections",
    link: "Collections"
  },
  {
    icon: <RiUserFollowLine />,
    title: "Subscribers",
    link: "Subscribers"
  },
  {
    icon: <IoSettingsSharp />,
    title: "Setting",
    link: "MyChannel"
  },
  {
    icon: <MdContactSupport />,
    title: "Support",
    link: "Support"
  }
];

const SideBar = () => {
  const { apigetMyUserChannelProfile } = useApp()
  const { user } = useAuth()
  // const navigate = useNavigate();
  const getUserChannelHandler = async () => {
    await apigetMyUserChannelProfile(user.username);
  }
  return (
    <aside className='sidebar'>
      {
        sidebar_data.map((item, index) => {
          return (
            <div key={index} className={`item-container ${index === 6 ? 'fl' : ""}`}  >
              <Link to={item.link}>
                <div className='item-icon'>
                  {item.icon}
                </div>
                <div className='item-title'>
                  {item.title}
                </div>
              </Link>

            </div>
          )
        })
      }
      <div className='item-container position-bottom' onClick={getUserChannelHandler}>
        <Link>
        <div className='item-icon'>
        <IoSettingsSharp />
        </div>
        <div className='item-title'>
          Settings
        </div>
        </Link>
      </div>
    </aside>
  )
}

export default SideBar