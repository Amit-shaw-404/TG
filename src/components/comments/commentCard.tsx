import { createRef, useState } from "react";
import ToolTip from "../profile/Tooltip";
import Moment from 'react-moment';

interface CommentCardProps {
    content:string,
    username:string,
    date:any,
    user_img:string,
    canEdit:boolean,
    id:string,
    handleDelete:any,
    handleEdit:any
}
 
const CommentCard: React.FunctionComponent<CommentCardProps> = ({content, username, date, user_img, canEdit, id, handleDelete, handleEdit}) => {
    let [expanded, setExpanded]=useState(false);
    let [canExpand, setCanExpand]=useState(false);
    let [cheight, setCheight]=useState(0);

    let ref:any=createRef();
    let iframeLoaded=()=>{
        var iFrameID = ref.current;
        if(iFrameID) {
              let height=iFrameID.contentWindow.document.body.scrollHeight;
              if(height>80){
                  setCanExpand(true);
                  setCheight(height+30);
              }
        }   
    }
    return (
        <div className="w-full bg-white shadow-md border p-5 my-1">
            <div className="flex justify-between w-full">
                <ToolTip username={username} profile={false}>
                    <div className={`flex space-x-4`}>
                        <img className="inline object-cover w-12 h-12 mr-2 rounded-full" src={!user_img?"/images/profile.png":user_img}/>
                        <div>
                            <h2 className="text-base font-semibold">{username}</h2>
                            <p className="text-sm text-gray-500"><Moment format="YYYY/MM/DD">{date}</Moment></p>
                        </div>
                    </div>
                </ToolTip>
                {canEdit && 
                <div className="flex space-x-4">
                    <img src="/images/edit.png" style={{width:"15px", height:"15px", cursor:"pointer"}} onClick={()=>handleEdit(id)}></img>
                    <img src="/images/deleteBin.png" style={{width:"15px", height:"15px", cursor:"pointer"}} onClick={()=>handleDelete(id)}></img>
                </div>
                }
            </div>
            {!expanded && 
                <div className="w-full flex flex-col space-y-2 items-center">
                    <iframe
                        ref={ref}
                        srcDoc={content}
                        scrolling="no"
                        onLoad={()=>iframeLoaded()}
                        height={"80px"}
                        width={"100%"}
                    />
                    {canExpand && <p className="cursor-pointer" onClick={()=>setExpanded(true)}>See more</p>}
                </div>
            }
            {expanded &&
                <div className="w-full flex flex-col space-y-2 items-center">
                    <iframe
                        ref={ref}
                        srcDoc={content}
                        scrolling="no"
                        width={"100%"}
                        height={`${cheight}px`}
                    />
                    {canExpand && <p className="cursor-pointer" onClick={()=>setExpanded(false)}>See less</p>}
                </div>
            }
        </div>
    );
}
 
export default CommentCard;