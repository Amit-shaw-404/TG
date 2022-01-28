import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SAVE_CURRENT_DATA, SAVE_REFS, TOGGLE_SIGN_IN } from "../../store/types";

interface CardsProps {
    data:any,
    setLoading:any
    // setCard:any
}
 
const Cards: React.FunctionComponent<CardsProps> = ({data, setLoading}) => {
    let [isFull, setIsFull]=useState(false);
    let ratingFull=Math.floor(parseFloat(data.rating));
    let half=ratingFull<parseFloat(data.rating);
    let ref:any=createRef()
    let rArr=[]
    let eArr=[];
    for(let i=0;i<ratingFull;i++)rArr.push("one");
    for(let i=0;i<5-Math.ceil(parseFloat(data.rating));i++)eArr.push("zero")
    let availImg=(data.photo && data.photo.images)?true:false;
    let username=useSelector((state:any)=>state.currentDetails.username)
    let history=useHistory();
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type:SAVE_REFS, payload:ref})
    }, [])
    let handleBlogClick=()=>{
        //check loggedIn here
        console.log(username);
        if(username){
            dispatch({type:SAVE_CURRENT_DATA, payload:data});
            // setLoading(true);
            // history.push(`/blogs/${data.location_id}`);
            setTimeout(()=>{
                // setLoading(false);
                history.push(`/blogs/${data.location_id}`);
            }, 1500)
        }
        else{
            dispatch({type:TOGGLE_SIGN_IN});
        }
    }
    return (
        <div className="w-4/6 p-2 rounded overflow-hidden shadow-lg" ref={ref}>
            <img className="w-full" style={{height:"250px"}} src={availImg?(data.photo?.images?.medium?.url):"https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"}/>
            <div className="w-full px-3">
                <div className="w-full my-3 flex space-x-5">
                    <h2 className="text-2xl" style={{maxWidth:"60%"}}>{data.name}</h2>
                    <div className="flex space-x-5 items-center">
                        <div className="flex space-x-1">
                            {rArr.map((_, ind)=><img key={ind} style={{width:"25px",height:"25px"}} src="/images/starFull.png"/>)}
                            {half && <img style={{width:"25px",height:"25px"}} src="/images/starHalf.png"/>}
                            {eArr.map((_, ind)=><img key={ind} style={{width:"25px",height:"25px"}} src="/images/starEmpty.png"/>)}
                        </div>
                    </div>
                </div>
                <div>
                {data.is_closed && 
                <span className="text-sm font-medium bg-red-100 py-1 px-2 rounded text-red-500 align-middle">Closed</span>
                }
                {!data.is_closed && 
                <span className="text-sm font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle">Opened</span>
                }
                </div>
                <div className="w-full flex justify-between text-gray-700 my-2">
                    <p className="text-lg mr-4">Ranking</p>
                    <div>
                        <p>{data.ranking}</p>
                    </div>
                </div>
                {isFull && 
                    <div className="w-full">
                        <div className="flex flex-col space-y-2 w-full">
                            {data.awards && data.awards.map((award:any, ind:number)=>
                                <div className="w-full flex justify-between text-sm text-gray-700" key={ind}>
                                    <img src={award.images.small}></img>
                                    <p>{award.display_name} {award.year}</p>
                                </div>
                            )}
                        </div>
                        {data.description && data.description.length>0 &&
                            <div className="w-full">
                                <p className="my-4 text-xl font-semibold">Description</p>
                                <p className="mb-5">
                                    {data.description}
                                </p>
                            </div>
                        }
                        <div className="w-full font-bold flex space-x-2 text-gray-700 my-2 items-center">
                            <img style={{width:"25px", height:"25px"}} src="/images/address.png" />
                            <p>{data.address}</p>
                        </div>
                        { data.phone && data.phone.length>0 &&
                        <div className="flex space-x-2 mb-3">
                            <img style={{width:"25px", height:"25px"}} src="/images/phone.png" />
                            <p>{data.phone}</p>
                        </div>
                        }
                        <div className="flex space-x-3">
                            <a href={data.web_url} target="_blank" className="cursor-pointer text-sm font-medium bg-green-100 py-1 px-2 rounded align-middle">Visit Website</a>
                            <p className="cursor-pointer text-sm font-medium bg-green-100 py-1 px-2 rounded align-middle" onClick={()=>handleBlogClick()}>Create a blog</p>
                        </div>
                    </div>
                }
                <div className="w-full flex justify-center text-black text-lg font-semibold">
                    {!isFull && 
                    <div className="flex space-x-2 cursor-pointer items-center" onClick={()=>setIsFull(true)}>
                        <p>See More</p>
                        <img style={{width:"20px", height:"20px"}} src="/images/down.png"></img>
                    </div>
                    }
                    {isFull &&
                    <div className="flex space-x-2 cursor-pointer items-center" onClick={()=>setIsFull(false)}>
                        <p>See Less</p>
                        <img style={{width:"20px", height:"20px"}} src="/images/up.png"></img>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Cards;