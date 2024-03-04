import React, {useEffect, useState} from 'react'
import { useApp } from '../contextAPI/appcontext';
import { MdDelete } from "react-icons/md";
import { MdTipsAndUpdates } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import img1 from "./img1.png";
import { getLikedCommentStatus } from '../api';

const VideoComment = ({videoId}) => {
  const {apigetVideoComment, apiaddComment, apiupdateComment, videoComments, apitoggleCommentLike, apigetLikedCommentStatus, apideleteComment} = useApp();
  const [toggleCommentLike, setToggleCommentLike] = useState(false);
  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState('');
  const [commentFlag, setCommentFlag] = useState(false);
  const [updateCommentFlag, setUpdateCommentFlag] = useState(false);
  const [cs, setCs] = useState('');

  useEffect(() => {
    try {
      const getAllVideocomments = async () => {
        await apigetVideoComment(videoId);
      }
      getAllVideocomments()
    } catch (error) {
      console.log(error);
    }
  },[videoId, commentFlag]);

  // useEffect(() => {
  //   try {
  //     const getCommentlikestatus = async () => {
  //       await apigetLikedCommentStatus(cs);
  //     }
  //     getCommentlikestatus();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [toggleCommentLike]);

  const commentLikeHandler = async (comment_Id) => {
    setCommentId(comment_Id);
    await apitoggleCommentLike(commentId);
    setToggleCommentLike(!toggleCommentLike);
  }
  const addCommentHandler = async () => {
    try {
      if(updateCommentFlag){
        await apiupdateComment(commentId, comment);
        setUpdateCommentFlag(false);
        setComment('');
      }else{
        await apiaddComment(videoId, comment);
        setComment('');
      }
      setCommentFlag(!commentFlag);
    } catch (error) {
      console.log(error);
    }
  } 

  const commentUpdateHandler = (comment_Id, comment_content) => {
    setComment(comment_content);
    setUpdateCommentFlag(true);
    setCommentId(comment_Id);
  }

  const deleteCommentHandler = async (comment_Id) => {
    try {
      setCommentId(comment_Id);
      await apideleteComment(commentId);
      setCommentFlag(!commentFlag);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h3 className='comment-container-title'>573 Comments</h3>
      <div className='flex-row comment-input-btn gap-1'>
        <input className='comment-input' type='text' required placeholder='Add a Comment' value={comment} onChange={(e) => setComment(e.target.value) }/>
        <button className='button' onClick={addCommentHandler}>{updateCommentFlag ? "Edit":"Add"}</button>
      </div>
      <div className='comments'>
        {
          videoComments.length === 0 ? "No comments are added":
          videoComments.map((comment, index) => {
            return(
              <div className='singleComment-container ' key={index}>
                
                <div className='comment-left-body '>
                  <img className='comment-user-avatar v-card-owner-avatar' src={img1} alt='comment owner avatar'/>
                  <div>
                    <div className='comment-owner-fullname'>this owner</div>
                    <div className='comment-owner-username'>@umesha</div>
                    <div className='comment-body'>{comment.content}</div>
                    <div className='comment-crud'>
                      <span  onClick={() => commentLikeHandler(comment._id)} className={`font-size-2 cursor ${getLikedCommentStatus?'liked-color':''}`}>{getLikedCommentStatus?<BiSolidLike/>: <BiLike/>}</span>
                      <span className="cursor" onClick={() => commentUpdateHandler(comment._id, comment.content)}><MdTipsAndUpdates/></span>
                      <span className="cursor" onClick={() => deleteCommentHandler(comment._id)}><MdDelete/></span>
                    </div>
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

export default VideoComment