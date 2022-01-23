import { useState } from "react";

interface HotelCardsProps {
    data:any
}
 
const HotelCards: React.FunctionComponent<HotelCardsProps> = ({data}) => {
    let [isFull, setIsFull]=useState(false);
    let ratingFull=Math.floor(parseFloat(data.rating));
    let half=ratingFull<parseFloat(data.rating);
    // console.log(data);
    let rArr=[]
    let eArr=[];
    for(let i=0;i<ratingFull;i++)rArr.push("one");
    for(let i=0;i<5-Math.ceil(parseFloat(data.rating));i++)eArr.push("zero")
    let availImg=(data.photo && data.photo.images)?true:false;
    return (
        <div className="w-3/4 p-2 rounded overflow-hidden shadow-lg">
            <img className="w-full" src={availImg?(data.photo?.images?.medium?.url):"https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"}/>
            <div className="w-full px-3">
                <div className="w-full my-3 flex space-x-5">
                    <h2 className="text-2xl">{data.name}</h2>
                    <div className="flex space-x-5 items-center">
                        <div className="flex space-x-1">
                            {rArr.map((_, i)=><img key={i} style={{width:"25px",height:"25px"}} src="/images/starFull.png"/>)}
                            {half && <img style={{width:"25px",height:"25px"}} src="/images/starHalf.png"/>}
                            {eArr.map((_, i)=><img key={i} style={{width:"25px",height:"25px"}} src="/images/starEmpty.png"/>)}
                        </div>
                    </div>
                </div>
                <div>
                {data.is_closed && 
                <span className="text-sm font-medium bg-red-100 py-1 px-2 rounded text-red-500 align-middle">Closed</span>
                }
                {!data.is_closed && 
                <span className="text-sm font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle">{data.open_now_text}</span>
                }
                </div>
                <div className="w-full flex justify-between text-gray-700 my-2">
                    <p className="text-lg">Ranking</p>
                    <p>{data.ranking}</p>
                </div>
                <div className="w-full flex justify-between text-gray-700 my-2">
                    <p className="text-lg">Distance</p>
                    <p>{data.distance_string}</p>
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
                        <div className="w-full font-bold flex justify-between text-gray-700 my-2 items-center">
                            <p>{data.address}</p>
                        </div>
                        { data.phone && data.phone.length>0 &&
                        <div className="flex space-x-2 mb-3">
                            <img style={{width:"25px", height:"25px"}} src="/images/phone.png" />
                            <p>{data.phone}</p>
                        </div>
                        }
                        <a href={data.web_url} target="_blank" className="cursor-pointer text-sm font-medium bg-green-100 py-1 px-2 rounded align-middle">Visit Website</a>
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
 
export default HotelCards;