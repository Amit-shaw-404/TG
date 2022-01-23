import {Autocomplete} from '@react-google-maps/api'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TOGGLE_SIGN_IN } from '../store/types';
import ProfileOptions from './profileOptions';
interface HeaderProps {
    setCoordinates:any|null
}
 
const Header: React.FunctionComponent<HeaderProps> = ({setCoordinates}) => {
    let history=useHistory();
    let [autocomplete, setAutocomplete]=useState(null);
    let username=useSelector((state:any)=>state.currentDetails.username);
    let dispatch=useDispatch();
    let onLoad=(autoVal:any)=>{
        setAutocomplete(autoVal)
    }
    let onPlaceChanged=()=>{
        //@ts-ignore
        let lat=autocomplete?.getPlace().geometry?.location.lat();
        //@ts-ignore
        let lng=autocomplete?.getPlace().geometry?.location.lng();
        setCoordinates({lat, lng})
    }

    let handleProfileClick=()=>{
        if(username){
            // history.push(`/${username}`);
        }else{
            dispatch({type:TOGGLE_SIGN_IN});
        }
    }
    return (
        <div className="w-full flex justify-between px-5 py-5 bg-blue-600 text-white">
            <div>
                <h2 className="text-3xl font-semibold cursor-pointer" onClick={()=>history.push("/")}>
                    TravellerGuide
                </h2>
            </div>
            <div className="flex space-x-3 items-center">
                <div className="mx-2 bg-white px-5 py-2 text-black rounded-md flex space-x-3">
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className="flex">
                            <input type="text" placeholder="Search for places"></input>
                            <img className="cursor-pointer" src="/images/search.svg" alt="search"/>
                        </div>
                    </Autocomplete>
                </div>
                <div className='dropdown inline relative'>
                    <img className='cursor-pointer' src="/images/profile.png" style={{width:"30px", height:"30px"}} alt="profile" onClick={()=>handleProfileClick()}></img>
                    <ProfileOptions/>
                </div>
            </div>
        </div>
    );
}
 
export default Header;