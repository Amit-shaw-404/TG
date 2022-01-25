import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import Header from "../header";
import BlogCard from "./blogCard";
import CreateBlog from "./createBlog";
import MainCard from "./mainCard";
import PrototypeCard from "./prototype";

interface BlogMainProps {
    
}
 
const BlogMain: React.FunctionComponent<BlogMainProps> = () => {
    let [createBlog, setCreateBlog]=useState(false);
    let [blogs, setBlogs]=useState([]);
    let [active, setActive]=useState(true);
    let [sortRecent, setSortRecent]=useState(false);
    let [sortLiked, setSortLikes]=useState(false);
    let [loading, setLoading]=useState(true);
    let username=useSelector((state:any)=>state.currentDetails.username);
    let userId=useSelector((state:any)=>state.currentDetails.id);
    let checkRedirect=()=>{
        if(username===null || username===undefined || userId===null || userId===undefined || selected_id===null || selected_id===undefined){
            window.location.replace("https://tguide.netlify.app/");
        }
    }
    // useEffect(()=>{
    //     checkRedirect();
    // }, [])
    let selected_id=useSelector((state:any)=>state.currentDetails?.selected?.location_id)
    useEffect(()=>{
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"getBlogsByLocation", {location_id:selected_id, id:userId},{
            headers:{
                "x-access-token":token
            }
        })
        .then(res=>{
            // console.log(res);
            if((username===null || username===undefined || userId===null || userId===undefined || selected_id===null || selected_id===undefined)){
                checkRedirect();
            }else{
                setLoading(false);
                setBlogs(res.data);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }, [active])
    let handleCreatePost=(val:any)=>{
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"createPost", {id:userId, title:val.title, content:val.content, location_id:selected_id},
        {
            headers:{
                "x-access-token":token
            }
        })
        setCreateBlog(false);
        setActive(false);
        setTimeout(()=>{
            setActive(true);
        }, 1500);
    }
    let handleRecent=()=>{
        setSortRecent(!sortRecent)
        setSortLikes(false);
    }
    let handleLiked=()=>{
        setSortLikes(!sortLiked);
        setSortRecent(false);
    }
    return (
        <div className="w-full bg-gray-100 min-h-screen">
            <Header setCoordinates={null}/>
            {loading && 
                    <div className="w-full flex justify-center items-center" style={{height:"80vh"}}>
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-purple-500" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
            }
            {!loading && 
            <div className="flex w-full">
                <div className="w-7/12 max-h-screen overflow-y-scroll scroll overflow-x-hidden flex flex-col items-center">
                    <div className="space-y-5 my-5 w-8/12 h-full">
                        <div className="w-full flex justify-between px-3 py-1 bg-white items-center">
                            <div className="flex space-x-5">
                                <p className={`cursor-pointer ${sortRecent?"font-semibold":""}`} onClick={()=>handleRecent()}>Most Recent</p>
                                <p className={`cursor-pointer ${sortLiked?"font-semibold":""}`} onClick={()=>handleLiked()}>Most Liked</p>
                            </div>
                            <button className="px-3 py-2 rounded text-white bg-gray-700" onClick={()=>{setCreateBlog(true)}}>
                                <div className="flex space-x-2 items-center">
                                    <p>New</p>
                                    <img style={{width:"20px", height:"20px"}} src="/images/plusWhite.png" alt="Create new"></img>
                                </div>
                            </button>
                        </div>
                        {
                            createBlog && 
                            <CreateBlog setCreateBlog={setCreateBlog} handleCreatePost={handleCreatePost}/>
                        }
                        <PrototypeCard/>
                        {
                            blogs && sortLiked && !sortRecent && blogs.sort((a:any, b:any)=>{
                                if(a.likes>b.likes)return 1;
                                return -1;
                            }).map((blog:any, index)=>(
                                <BlogCard key={index} blog={blog} isUser={false} handleDelete={null} handleEdit={null}/>
                            ))
                        }
                        {
                            blogs && !sortLiked && sortRecent && blogs.sort((a:any, b:any)=>{
                                if(a.date<b.date)return 1;
                                return -1;
                            }).map((blog:any, index)=>(
                                <BlogCard key={index} blog={blog} isUser={false} handleDelete={null} handleEdit={null}/>
                            ))
                        }
                        {
                            blogs && !sortLiked && !sortRecent && blogs.map((blog:any, index)=>(
                                <BlogCard key={index} blog={blog} isUser={false} handleDelete={null} handleEdit={null}/>
                            ))
                        }
                        
                    </div>
                </div>
                <div className="w-5/12">
                    <MainCard/>
                </div>
            </div>
            }
        </div>
    );
}
 
export default BlogMain;