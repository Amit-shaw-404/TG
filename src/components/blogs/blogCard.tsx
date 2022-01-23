import axios from "axios";
import { createRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ToolTip from "../profile/Tooltip";
import Moment from 'react-moment';
import { BASE_URL } from "../../constants/api";

interface BlogCardProps {
    blog:any,
    isUser:any,
    handleDelete:any,
    handleEdit:any
}
 
const BlogCard: React.FunctionComponent<BlogCardProps> = ({blog, isUser, handleDelete, handleEdit}) => {
    let [username, setUsername]=useState("");
    let [liked, setLiked]=useState(false);
    let history=useHistory()
    let pathname=history.location.pathname
    let ref:any=createRef();
    let date=blog.date
    let mainUser=useSelector((state:any)=>state.currentDetails.username);
    let id=useSelector((state:any)=>state.currentDetails.id)
    useEffect(()=>{
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"isLiked", {username:mainUser, user_id:id, blogId:blog.blogId}, {
            headers:{
                "x-access-token":token
            }
        })
        .then(res=>{
            setLiked(true);
        })
        .catch(err=>{
            setLiked(false);
        })
    }, [])
    let handleLike=()=>{
        let url=BASE_URL;
        if(liked){
            url+="decrementLike";
        }else{
            url+="incrementLike";
        }
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(url, {username:mainUser, user_id:id, blogId:blog.blogId, blog_admin:blog.user._id}, {
            headers:{
                "x-access-token":token
            }
        })
        .then(res=>{
            setLiked(!liked);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div className={`w-full p-5 shadow-md rounded-sm cursor-pointer bg-white`} style={{height:"auto", overflowY:"hidden"}}>
            <div className="w-full flex justify-between" >
                <ToolTip username={username} profile={false}>
                    <div onClick={()=>history.push(`/blogs/user/${blog.blogId}`)} className={`flex space-x-4`} onMouseOver={()=>setUsername(blog.user.username)}>
                        <img className="inline object-cover w-12 h-12 mr-2 rounded-full" src={(!blog.user.image)?"/images/profile.png":blog.user.image}/>
                        <div>
                            <h2 className="text-xl font-semibold">{blog.user.username}</h2>
                            <p className="text-sm text-gray-500"><Moment format="YYYY/MM/DD">{date}</Moment></p>
                        </div>
                    </div>
                </ToolTip>
                {isUser && 
                <div className="flex space-x-4">
                    <img src="/images/edit.png" style={{width:"20px", height:"20px", cursor:"pointer"}} onClick={()=>handleEdit(blog.blogId)}></img>
                    <img src="/images/deleteBin.png" style={{width:"20px", height:"20px", cursor:"pointer"}} onClick={()=>handleDelete(blog.blogId)}></img>
                </div>
                }
            </div>
            <div className="max-w-full w-full h-auto">
                <iframe scrolling="no" ref={ref} width={"100%"} height={"500px"} srcDoc={blog.content}
                />
            </div>
            <div className="w-full flex justify-center"  onClick={()=>history.push(`/blogs/user/${blog.blogId}`)}>See More</div>
            <div className="flex space-x-4">
                <img style={{width:"30px", height:"30px", cursor:"pointer"}} src={liked?"/images/liked.png":"/images/like.png"} alt="like" onClick={()=>handleLike()}></img>
                <img style={{width:"30px", height:"30px", cursor:"pointer"}} src="/images/comment.png" alt="comment" onClick={()=>history.push(`/blogs/user/${blog.blogId}`)}></img>
                {/* <img style={{width:"30px", height:"30px", cursor:"pointer"}} src="/images/share.png" alt="share"></img> */}
            </div>
        </div>
    );
}
 
export default BlogCard;