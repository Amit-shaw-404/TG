import axios from "axios";
import { createRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import CommentCard from "../comments/commentCard";
import CreateComment from "../comments/createComment";
import EditComment from "../comments/editComment";
import Header from "../header";
import ToolTip from '../profile/Tooltip'
import Moment from 'react-moment';
import { BASE_URL } from "../../constants/api";

interface DetailsDialogProps {
}
 
const DetailsDialog: React.FunctionComponent<DetailsDialogProps> = () => {
    let [liked, setLiked]=useState(false);
    let history=useHistory();
    let pathname=history.location.pathname;
    let paths=pathname.split("/")
    let blogId=paths[paths.length-1];
    let username=useSelector((state:any)=>state.currentDetails.username)
    let id=useSelector((state:any)=>state.currentDetails.id)
    let checkRedirect=()=>{
        if(username===null || username===undefined){
            window.location.replace("https://tguide.netlify.app/");
        }
    }
    checkRedirect();
    let [blog, setBlog]=useState({
        title:"",
        content:"",
        blogId:"",
        likes:0,
        comments:0,
        location_id:"",
        user:{
            username:"",
            image:"",
            _id:""
        },
        date:""
    });
    let [newComment, setNewComment]=useState(false);
    let [comments, setComments]=useState<any>([]);
    let [editComment, setEditComment]=useState(false);
    let [onEditComment, setOnEditComment]=useState<any>({});
    let ref:any=createRef();
    function iframeLoaded() {
        var iFrameID = ref.current;
        if(iFrameID) {
              // here you can make the height, I delete it first, then I make it again
              iFrameID.height = "";
              iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight+50+  "px";
            }   
    }
    let handleFetchComments=()=>{
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"getComments", {blogId}, {
            headers:{
                "x-access-token":token
            }
        })
        .then(res=>{
            // console.log(res);
            setComments(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        axios.post(BASE_URL+"getBlogDetails", {blogId}
        ).then(res=>{
            // console.log(res.data);
            setBlog(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
        handleFetchComments();
    }, [])

    useEffect(()=>{
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"isLiked", { user_id:id, blogId:blog.blogId}, {
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
    }, [blog])

    let handleCreateComment=(content:any)=>{
        setNewComment(false);
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"createComment", {content, blogId, user_id:id}, {
            headers:{
                "x-access-token":token
            }
        })
        .then(res=>{
            // console.log(res);
            handleFetchComments();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    let handleDelete=(cid:any)=>{
        axios.post(BASE_URL+"deleteComment", {comment_id:cid})
        .then(res=>{
            let temp=comments
            temp=temp.filter((comment:any)=>comment.comment_id!==cid);
            setComments(temp);
        })
    }
    let handleEdit=(cid:any)=>{
        let temp=comments;
        let val=temp.filter((comment:any)=>comment.comment_id==cid)[0];
        temp=temp.filter((comment:any)=>comment.comment_id!=cid);
        setComments(temp);
        setOnEditComment(val);
        setEditComment(true);
    }
    let handleCancelEdit=()=>{
        let temp:any=comments;
        temp.push(onEditComment);
        setComments(temp);
        setEditComment(false);
    }
    let handleUpdate=(newContent:any)=>{
        setEditComment(false);
        let comment_id=onEditComment.comment_id;
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"updateComment", {content:newContent, comment_id})
        .then(res=>{
            let c:any=comments;
            let temp:any=onEditComment;
            temp.content=newContent;
            // console.log(temp);
            setComments([...comments, temp]);
        })
        .catch(err=>{
            console.log(err);
            let c:any=comments;
            c.push(onEditComment);
            setComments(c);
        })
    }
    let handleLike=()=>{
        let url=BASE_URL;
        if(liked){
            url+="decrementLike";
        }else{
            url+="incrementLike";
        }
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(url, { user_id:id, blogId:blog.blogId, blog_admin:blog.user._id}, {
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
        <div className="w-ful min-h-screen bg-gray-200 ">
            <Header setCoordinates={null}/>
            <div className="flex justify-center w-full" style={{height:"90vh"}}>
                <div className="w-3/4 bg-white flex p-5 shadow-md my-2">
                    <div className="w-1/2 flex flex-col space-y-4">
                        <ToolTip username={blog.user.username} profile={true}>
                            <div className={`flex space-x-4`}>
                                <img className="inline object-cover w-12 h-12 mr-2 rounded-full" src={(!blog.user.image)?"/images/profile.png":blog.user.image}/>
                                <div>
                                    <h2 className="text-xl font-semibold">{blog.user.username}</h2>
                                    <p className="text-sm text-gray-500"><Moment format="YYYY/MM/DD">{blog.date}</Moment></p>
                                </div>
                            </div>
                        </ToolTip>
                        <div className="max-w-full overflow-y-scroll scroll" style={{height:"70vh"}}>
                            <iframe scrolling="no" ref={ref} onLoad={()=>iframeLoaded()} width={"100%"} srcDoc={blog.content}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 p-3">
                        <div>
                            <h2 className="text-xl font-semibold ml-3 mb-5">#{blog.title}</h2>
                        </div>
                        <div className="w-full justify-between flex items-center m-5">
                            <div className="flex space-x-5">
                                <img style={{width:"30px", height:"30px", cursor:"pointer"}} src={liked?"/images/liked.png":"/images/like.png"} alt="like" onClick={()=>handleLike()}></img>
                                <img style={{width:"30px", height:"30px", cursor:"pointer"}} src="/images/comment.png" alt="comment" onClick={()=>setNewComment(true)}></img>
                                {/* <img style={{width:"30px", height:"30px", cursor:"pointer"}} src="/images/share.png" alt="share"></img> */}
                            </div>
                            <div className="flex space-x-5 items-center">
                                <p className="text-lg cursor-pointer">Recent</p>
                                <button className="flex items-center space-x-2 bg-gray-700 text-white px-3 py-2 rounded-md" onClick={()=>setNewComment(true)}>
                                    <p>New</p>
                                    <img src="/images/plusWhite.png"/>
                                </button>
                            </div>
                        </div>
                        <p className="w-full bg-gray-100" style={{height:"1px"}}></p>
                        <div className="flex flex-col space-y-3 overflow-y-scroll scroll" style={{height:"65vh"}}>
                            {newComment && <CreateComment setNewComment={setNewComment} handleCreateComment={handleCreateComment}/>}
                            {editComment && 
                            <EditComment setEdit={handleCancelEdit} comment={onEditComment} setEdited={handleUpdate}/>
                            }
                            {comments && comments.length>0 &&
                                comments.map((comment:any, index:number)=>(
                                    <CommentCard canEdit={id===comment.user_id} id={comment.comment_id} username={comment.user.username} user_img={comment.user.image} date={comment.date} key={index} content={comment.content} handleDelete={handleDelete} handleEdit={handleEdit}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default DetailsDialog;