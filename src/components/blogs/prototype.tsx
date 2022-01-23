import { createRef } from "react";
import ToolTip from "../profile/Tooltip";

interface PrototypeCardProps {
    
}
 
const PrototypeCard: React.FunctionComponent<PrototypeCardProps> = () => {
    let ref:any=createRef();
    return (
        <div className={`w-full p-5 shadow-md rounded-sm cursor-pointer bg-white`} style={{height:"auto", overflowY:"hidden"}}>
            <div className="w-full flex justify-between" >
                <ToolTip username={"1mKnown"} profile={false}>
                    <div className={`flex space-x-4`}>
                        <img className="inline object-cover w-12 h-12 mr-2 rounded-full" src={"/images/profile.png"}/>
                        <div>
                            <h2 className="text-xl font-semibold">1mKnown</h2>
                            <p className="text-sm text-gray-500">2022/01/22</p>
                        </div>
                    </div>
                </ToolTip>
                {/* {isUser && 
                <div className="flex space-x-4">
                    <img src="/images/edit.png" style={{width:"20px", height:"20px", cursor:"pointer"}} onClick={()=>handleEdit(blog.blogId)}></img>
                    <img src="/images/deleteBin.png" style={{width:"20px", height:"20px", cursor:"pointer"}} onClick={()=>handleDelete(blog.blogId)}></img>
                </div>
                } */}
            </div>
            <div className="max-w-full w-full h-auto">
                {/* <iframe scrolling="no" ref={ref} width={"100%"} height={"500px"} srcDoc={blog.content}
                /> */}
                <div style={{height:"500px",margin:"10px 0"}}>
                    <p className="text-lg">Simple steps to create your own blogs: </p>
                    <div className="my-3 flex justify-around items-center">
                        <img className="border-2" style={{height:"80px", width:"150px"}} src="/images/step1.png"></img>
                        <img className="border-2" style={{height:"180px", width:"250px"}} src="/images/step2.png"></img>
                    </div>
                    <div className="my-3 flex justify-around items-center">
                        <img className="border-2" style={{height:"180px", width:"250px"}} src="/images/step3.png"></img>
                        <img className="border-2" style={{height:"180px", width:"250px"}} src="/images/step4.png"></img>
                    </div>
                    {/* <p className="my-2 text-lg font-semibold">Create your own blogs about the places</p> */}
                </div>
            </div>
            {/* <div className="w-full flex justify-center"  onClick={()=>history.push(`/blogs/user/${blog.blogId}`)}>See More</div> */}
            <div className="flex space-x-4">
                <img style={{width:"30px", height:"30px", cursor:"not-allowed"}} src={"/images/liked.png"} alt="like" ></img>
                <img style={{width:"30px", height:"30px", cursor:"not-allowed"}} src="/images/comment.png" alt="comment"></img>
                {/* <img style={{width:"30px", height:"30px", cursor:"pointer"}} src="/images/share.png" alt="share"></img> */}
            </div>
        </div>
    );
}
 
export default PrototypeCard;