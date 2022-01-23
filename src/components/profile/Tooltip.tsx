import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/api";
import ProfileLoader from "../profileLoader";
import "./tooltip.css";
interface ToolTipProps {
    username:any,
    profile:any
}
 
const ToolTip: React.FunctionComponent<ToolTipProps> = (props) => {
    let {username, profile}=props;
    let [loading, setLoading]=useState(true);
    let timeout:any;
    const [active, setActive] = useState(false);
    let [user, setUser]=useState({name:"", bio:"", likes:"", image:""});
    useEffect(()=>{
        if(user.name && user.name.length>0){
            setLoading(false);
        }
    }, [user])
    const showTip = () => {
          setActive(true);
          axios.post(BASE_URL+"getUser", {username}
          ).then(res=>{
            setUser(res.data);
          }).catch(err=>{
            console.log(err);
          })
    };
    const hideTip = () => {
        // clearInterval(timeout);
        setActive(false);
      };
    return (
        <div
        className="Tooltip-Wrapper"
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        >
        {props.children}
        {
           active && loading && <ProfileLoader/>
        }
        {active && !loading && (
            <div className={`Tooltip-Tip ${profile?"Tool-Tip-profile":""}`} style={{width:"400px", height:"auto"}}>
                <div className="p-5">
                    <div className="flex space-x-5 items-center">
                        <img className="inline object-cover border-2 w-14 h-14  rounded-full" src={(!user.image)?"/images/profile.png":user.image} alt="Profile image" style={{alignSelf:"flex-start"}}/>
                        <div className="flex flex-col">
                            <p className="text-lg">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.likes} likes</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="text-xl font-semibold mt-3 ">About</p>
                        <p className="text-md my-3 max-w-full whitespace-pre-wrap">{user.bio}</p>
                    </div>
                </div>
            </div>
        )}
        </div>
  );
}
 
export default ToolTip;