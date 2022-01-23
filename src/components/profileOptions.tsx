import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SAVE_USER_DETAILS, TOGGLE_SIGN_IN } from "../store/types";

interface ProfileOptionsProps {
    
}
 
const ProfileOptions: React.FunctionComponent<ProfileOptionsProps> = () => {
    let history=useHistory();
    let username=useSelector((state:any)=>state.currentDetails.username);
    let dispatch=useDispatch();
    
    let handleLogout=()=>{
        let val=localStorage.getItem('tokentravellerGuide');
        if(!val)return;
        localStorage.removeItem('tokentravellerGuide')
        dispatch({type:SAVE_USER_DETAILS, payload:{username:null}})
        window.location.replace("http://localhost:3000/");
    }

    let handleProfileClick=()=>{
        if(username){
            history.push(`/${username}`);
        }else{
            dispatch({type:TOGGLE_SIGN_IN});
        }
    }
    return (
        <div className="w-full">
            <ul className="dropdown-menu right-1 absolute hidden text-gray-700 w-full shadow-md" style={{width:"150px"}}>
                 
                <li onClick={()=>handleProfileClick()} className="flex cursor-pointer space-x-3 rounded-t bg-white hover:bg-gray-50 py-2 px-4 whitespace-no-wrap items-center">
                    <p>Profile</p>
                </li>
                <li onClick={()=>handleLogout()} className="cursor-pointer rounded-t bg-white hover:bg-gray-50 py-2 px-4 whitespace-no-wrap">
                    <p>Log Out</p>
                </li>
                
            </ul>
        </div>
    );
}
 
export default ProfileOptions;