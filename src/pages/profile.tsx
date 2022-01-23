import axios from "axios";
import { createRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BlogCard from "../components/blogs/blogCard";
import Header from "../components/header";
import EditName from "../components/profile/editName";
import ImageOptions from "../components/profile/imageOptions";
import EditBlog from '../components/blogs/editBlog'
import PermissionDialog from "../components/permissionDialog";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_USER_DETAILS } from "../store/types";
import NotFound from "./notFound";
import { BASE_URL } from "../constants/api";

interface ProfileProps {
    
}
 
const Profile: React.FunctionComponent<ProfileProps> = () => {
    const history=useHistory();
    const username=history.location.pathname.replace("/", "");
    const [img, setImg]=useState("");
    const [selected, setSelecetd]=useState(-1);
    const [showDialog, setShowDialog]=useState(false);
    const [editBio, setEditBio]=useState(false);
    const [editInfo, setEditInfo]=useState(false);
    const [blogOnEdit, setBlogOnEdit]=useState<any>();
    const [posts, setPosts]=useState<any>([]);
    const [blogEdit, setBlogEdit]=useState(false);
    const [askDelete, setAskDelete]=useState(false);
    const [deletingId, setDeleteId]=useState();
    const [userId, setUserId]=useState("");
    const [loading, setLoading]=useState(true);
    const [notFound, setNotFound]=useState(false);
    const [realUser, setRealUser]=useState(false);
    const [user, setUser]=useState({
        name:"",
        bio:"",
        username:"",
        image:"",
        email:"",
        likes:0,
        _id:8881782
    })

    const refAbout:any=createRef();
    const dispatch=useDispatch();
    useEffect(()=>{
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"verify", {}, {
            headers:{
                "x-access-token":token,
            },
        }
        )
        .then(res=>{
            setRealUser(true);
        }).catch(err=>{

        })
    }, [])
    useEffect(()=>{
        if(user && user._id!==8881782){
            setLoading(false);
        }else if(!user){
            setLoading(false);
            setNotFound(true);
        }
    }, [user])
    useEffect(()=>{
        if(!userId || userId==="")return;
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"getBlogsByUsername", {id:userId}, {
            headers:{
                "x-access-token":token,
            },
            
        }).then(res=>{
            setPosts(res.data);
        }).catch(err=>{
            console.log(err);
        })
    }, [userId])
    useEffect(()=>{
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"getUser", {username}, {
            headers:{
                "x-access-token":token,
            },
            
        }).then(res=>{
            // console.log(res);
            setUser(res.data);
            setUserId(res.data._id);
        }).catch(err=>{
            console.log(err);
        })
    }, [])
    useEffect(()=>{
        if(selected===1){
            setShowDialog(true);
        }else if(selected===2){

        }
    }, [selected])

    let handleBlogDelete=(id:any)=>{
        setAskDelete(true);
        setDeleteId(id);
    }
    let handleBlogDeleteMain=()=>{
        setAskDelete(false);
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"deleteBlog", {blogId:deletingId}, {
            headers:{
                "x-access-token":token
            }
        })
        .then(res=>{
            let temp=posts.filter((post:any)=>post.blogId!==deletingId);
            setPosts(temp);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    let handleBlogEdit=(id:any)=>{
        setBlogEdit(true)
        let blog=posts.filter((post:any)=>post.blogId===id)[0];
        let filteredPosts=posts.filter((post:any)=>post.blogId!==id);
        setPosts(filteredPosts);
        setBlogOnEdit(blog);
    }
    let handleBlogUpdate=(modifiedContent:any)=>{
        setBlogEdit(false);
        let curPost=blogOnEdit;
        curPost.content=modifiedContent;
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"updateBlog", {blogId:curPost.blogId, content:modifiedContent}, {
            headers:{
                "x-access-token":token
            }
        })
        .then(res=>{
            setPosts([...posts, curPost]);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    let cancelBlogUpdate=()=>{
        setPosts([...posts, blogOnEdit]);
        setBlogEdit(false);
    }

    const uploadImg=()=>{
        setShowDialog(false);
        setSelecetd(-1);
        const formdata=new FormData();
        formdata.append('file', img);
        formdata.append('upload_preset', 'imgupload');
        axios.post("https://api.cloudinary.com/v1_1/amit-cloudinary/image/upload", formdata)
        .then(res=>{
            console.log(res);
            // let token=
            axios.post(BASE_URL+"imgUpdate", {username:username, img:res.data.secure_url, oldImg:user.image})
            .then(response=>{
                let temp=user;
                user.image=res.data.secure_url;
                setUser(temp);
            })
        })
    }
    let handleUpdate=(data:any)=>{
        setEditInfo(false);
        // console.log(data);
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        let url=BASE_URL;
        if(data.username===username){
            url+="updatename";
        }else{
            url+="updateUser&Name"
        }
        axios.post(url, {prevUsername:username, newUsername:data.username, name:data.name}, {
            headers:{
                "x-access-token":token,
            },
        })
        .then(res=>{
            // console.log(res);
            let temp=user;
            temp.name=data.name;
            temp.username=data.username;
            setUser(temp);
            localStorage.removeItem('tokentravellerGuide')
            dispatch({type:SAVE_USER_DETAILS, payload:{username:null}})
            window.location.replace("https://tguide.netlify.app/");
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    let handleBioUpdate=()=>{
        let val=refAbout.current.value;
        setEditBio(false);
        let token:any=localStorage.getItem(`tokentravellerGuide`);
        axios.post(BASE_URL+"updateBio", {username:user.username, bio:refAbout.current.value}, {
            headers:{
                "x-access-token":token
            }
        })
        .then(res=>{
            setUser({...user, bio:val});
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <EditName setEditInfo={setEditInfo} uname={user.name} mname={user.username} editInfo={editInfo} handleUpdate={handleUpdate}/>
            <Header setCoordinates={null}/>
            {loading && 
                <div className="w-full flex items-center justify-center" style={{height:"75vh"}}>
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-purple-500" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {!loading && notFound && 
                <NotFound profile={true}/>
            }
            {!loading && !notFound && 
            <div className={"w-full flex justify-center my-5"}>
                <div className="w-3/4 flex space-x-5">
                    <div className="bg-white p-5 w-2/5 flex flex-col space-y-5" style={{minHeight:"350px", alignSelf:"flex-start"}}>
                        <div className="flex space-x-2 items-center">
                            <div className="mr-5" style={{minHeight:"100px", minWidth:"120px"}}>
                                <div className="dropdown inline-block relative">
                                    <button className="text-gray-700 font-semibold rounded inline-flex items-center w-full">
                                        <img className="inline object-cover border-2 w-28 h-28  rounded-full" src={(!user.image)?"/images/profile.png":user.image} alt="Profile image" style={{alignSelf:"flex-start"}}/>
                                    </button>
                                    <ImageOptions setSelected={setSelecetd} admin={true} image={user.image}/>
                                </div>
                            </div>
                            <div className="my-5">
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-xl">{user.name}</p>
                                    <img src="/images/edit.png" alt="edit" className="cursor-pointer" style={{height:"15px", width:"15px"}} onClick={()=>setEditInfo(true)}/>
                                </div>
                                <p className="text-md text-gray-500">{user.username}</p>
                                <p className="text-sm text-gray-500">{user.likes} likes</p>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="w-full flex justify-between items-center">
                                <h2 className="text-2xl">About</h2>
                                <img className="cursor-pointer" src="/images/edit.png" alt="edit" style={{height:"20px", width:"20px"}} onClick={()=>setEditBio(true)}></img>
                            </div>
                            <p className="w-full bg-gray-200 my-3" style={{height:"1px"}}></p>
                            {!editBio && 
                            <p>
                                {user.bio}
                            </p>
                            }
                            {editBio && 
                                <div className="w-full h-full">
                                <textarea ref={refAbout} className="w-full h-4/5 outline-none border bg-gray-100" defaultValue={user.bio}/>
                                <div className="flex space-x-3 mt-5 justify-end">
                                    <button className="px-5 rounded py-2 text-white bg-red-600" onClick={()=>setEditBio(false)}>Cancel</button>
                                    <button className="px-5 rounded py-2 text-white bg-blue-600" onClick={()=>handleBioUpdate()}>Update</button>
                                </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="w-3/5 overflow-y-scroll scroll" style={{height:"80vh"}}>
                        <div className="bg-white flex justify-between items-center p-3 w-full">
                            <h2 className="text-xl font-semibold">#{realUser?"Your":"User's"} Blogs</h2>
                        </div>
                        <div className="w-full flex flex-col space-y-5 my-2">
                            {blogEdit && 
                                <EditBlog handleUpdate={handleBlogUpdate} prevContent={blogOnEdit.content} cancelUpdate={cancelBlogUpdate}/>
                            }
                            {posts && posts.sort((a:any, b:any)=>{
                                if(a.date<b.date)return 1;
                                return -1;
                            }).map((blog:any, index:number)=>(
                                <BlogCard key={index} blog={blog} isUser={realUser} handleEdit={handleBlogEdit} handleDelete={handleBlogDelete}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            }
            <div
                className={`fixed ${showDialog?"":"hidden"} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                id="my-modal`}
            >
                <div
                className="relative top-1/4 mx-auto p-5 py-8 border w-96 shadow-lg rounded-md bg-white flex flex-col"
                >
                    <input onChange={(e:any)=>setImg(e.target.files[0])} type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />
                    <div style={{margin:'30px 0 0 0'}}>
                        <div className="flex justify-end space-x-5">
                            <button onClick={()=>{setShowDialog(false); setSelecetd(-1)}} className="px-5 py-3 rounded-md" style={{backgroundColor:'red', color:'#fff'}}>Cancel
                            </button>
                            <button onClick={uploadImg} className="px-5 py-3 rounded-md" style={{backgroundColor:'blue', color:'#fff'}}>Upload
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
            <PermissionDialog show={askDelete} setShow={setAskDelete} handleAccept={handleBlogDeleteMain}/>
        </div>
    );
}
 
export default Profile;