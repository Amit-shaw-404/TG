import axios from 'axios';
import { useState } from 'react';
//@ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import { BASE_URL } from '../../constants/api';
import { SAVE_USER_DETAILS, TOGGLE_SIGN_IN } from '../../store/types';

interface LoggingCardProps {
}
 
const LoggingCard: React.FunctionComponent<LoggingCardProps> = () => {
  const [access, setAccess]=useState(false);
  const [uname, setUname]=useState("");
  let disPatch=useDispatch();
  let signIn=useSelector((state:any)=>state.currentDetails.signIn);
  const responseFacebook=(response:any)=>{
    // console.log(response);
    axios({
      method:'POST',
      url:BASE_URL+"facebooklogin",
      data:{userId:response.userID,accessToken:response.accessToken}
    })
    .then(res=>{
        localStorage.setItem(`tokentravellerGuide`,res.data.token)
        setUname(res.data.user.username);
        disPatch({type:SAVE_USER_DETAILS, payload:{username:res.data.user.username, id:res.data.user.id}})
        disPatch({type:TOGGLE_SIGN_IN});
        setAccess(true);
        // history.push(res.data.user.username);
        console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const responseGoogle=(response:any)=>{
    // console.log(response);
    axios({
      method:'POST',
      url:BASE_URL+"googlelogin",
      data:{tokenId:response.tokenId}
    })
    .then(res=>{
        localStorage.setItem(`tokentravellerGuide`,res.data.token)
        setUname(res.data.user.username);
        disPatch({type:SAVE_USER_DETAILS, payload:{username:res.data.user.username, id:res.data.user.id}})
        disPatch({type:TOGGLE_SIGN_IN});
        setAccess(true);
        // history.push(res.data.user.username);
        console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }
    return (
        <div
        className={`fixed ${signIn?"":"hidden"} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal`}
      >
        <div
          className="relative top-1/4 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white flex flex-col"
          style={{height:"280px"}}
        >
            <div className='flex w-full justify-end mb-5'>
              <img onClick={()=>{disPatch({type:TOGGLE_SIGN_IN})}} className='cursor-pointer' src="/images/close.png" alt="close"/>
            </div>
            <GoogleLogin
            clientId="284438104409-8vegvemobudmuk214kon2cbgp70ut161.apps.googleusercontent.com"
            buttonText="Log in with Google"
            render={renderProps => (
              <GoogleLoginButton onClick={renderProps.onClick}/>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <div className='flex w-full justify-around'>
            <p className='text-xl'> or </p>
          </div>
          <FacebookLogin
            appId="758164088474637"
            autoLoad={false}
            callback={responseFacebook}
            render={(renderProps:any) => (
              <FacebookLoginButton onClick={renderProps.onClick}/>
            )}
          />
        </div>
      </div>
    );
}
 
export default LoggingCard;