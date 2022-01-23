import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'
import './App.css';
import BlogMainContainer from './components/blogs/blogMainContainer';
import CreateBlog from './components/blogs/createBlog';
import DetailsDialog from './components/blogs/detailsDialog';
import LoggingCard from './components/login/loggingCard';
import { BASE_URL } from './constants/api';
import './index.css';
import HomePage from './pages/homepage';
import NotFound from './pages/notFound';
import Profile from './pages/profile';
import { SAVE_USER_DETAILS } from './store/types';

function App() {
  let dispatch=useDispatch();
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  useEffect(()=>{
    let token:any=localStorage.getItem("tokentravellerGuide");
    axios.post(BASE_URL+"verify", {}, {
      headers:{
        "x-access-token":token
      }
    })
    .then(res=>{
      // console.log(res);
      dispatch({type:SAVE_USER_DETAILS, payload:{username:res.data.username, id:res.data.id}});
    })
  }, [])
  return (
    <BrowserRouter>
      {isTabletOrMobile && 
        <div className='w-full bg-gray-50 h-screen flex justify-center items-center'>
          <p className='text-lg'>Currently not available for this device :(</p>
        </div>
      }
      {!isTabletOrMobile && 
      <Switch>
        {/* @ts-ignore */}
        <Route exact path="/" component={HomePage}></Route>
        {/* @ts-ignore */}
        <Route exact path="/user/create" component={CreateBlog}></Route>
        {/* @ts-ignore */}
        <Route exact path="/blogs/:id" component={BlogMainContainer}></Route>
        {/* @ts-ignore */}
        <Route exact path="/blogs/user/:id" component={DetailsDialog}></Route>
        {/* @ts-ignore */}
        <Route exact path="/:user" component={Profile}></Route>
        {/* @ts-ignore */}
        <Route component={()=><NotFound profile={false}/>}></Route>
      </Switch>
      }
      <LoggingCard/>
    </BrowserRouter>
  );
}

export default App;
