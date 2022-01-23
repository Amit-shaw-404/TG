import { createRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPlaces } from "../../constants/api";
import { CLEAR_REFS, SAVE_CURRENT_DATA, SAVE_REFS } from "../../store/types";
import Cards from "./card";

interface PlacesProps {
    bounds:any,
    setNewPlaces:any,
    places:Array<any>
}

let urls:any={
    "Attractions":"https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary",
    "Hotels":"https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary",
    "Resturants":"https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary"
}
const Places: React.FunctionComponent<PlacesProps> = ({bounds, places, setNewPlaces}) => {
    let [selected, setSelected]=useState("Attractions");
    let [rating, setRating]=useState(2)
    let [loading, setLoading]=useState(true);
    let dispatch=useDispatch();
    useEffect(()=>{
        dispatch({type:CLEAR_REFS});
        setLoading(true);
        let id=setTimeout(()=>{
            getPlaces(urls[selected], bounds.sw, bounds.ne).then((data)=>{
                setNewPlaces(data.data);
                setLoading(false);
            })
        }, 1000)
        return ()=>{
            clearTimeout(id);
        }
    }, [bounds, selected])
    return (
        <div className="w-full">
            <div className="flex w-full flex-col items-center">
                <div className="w-4/6 flex space-x-8 mt-2 mb-4 mx-5">
                    <div className="dropdown bg-gray-300 inline-block relative" style={{width:"140px"}}>
                        <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center w-full">
                        <span className="mr-1">{selected}</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                        </button>
                        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-full">
                        <li className=""><p className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={()=>setSelected("Attractions")}>Attractions</p></li>
                        <li className=""><p className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={()=>setSelected("Hotels")}>Hotels</p></li>
                        <li className=""><p className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={()=>setSelected("Resturants")}>Resturants</p></li>
                        </ul>
                    </div>
                    <div className="dropdown bg-gray-300 inline-block relative " style={{width:"140px"}}>
                        <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center w-full">
                        <span className="mr-1">Above {rating}</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                        </button>
                        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-full">
                        <li className=""><p className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={()=>setRating(4)}>Above 4</p></li>
                        <li className=""><p className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={()=>setRating(3)}>Above 3</p></li>
                        <li className=""><p className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={()=>setRating(2)}>Above 2</p></li>
                        <li className=""><p className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={()=>setRating(1)}>Above 1</p></li>
                        </ul>
                    </div>
                </div>
            </div>
            {loading && 
                <div className="w-full flex items-center justify-center" style={{height:"75vh"}}>
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-purple-500" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            <div className="flex flex-col space-y-5 w-full items-center justify-center">
                {!loading && places && places.filter((place:any)=>(parseFloat(place.rating)>rating)).map((place:any, index:number)=>
                    <Cards data={place} key={index}/>
                )}
            </div>
        </div>
    );
}
 
export default Places;