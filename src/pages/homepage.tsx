import { useEffect, useState } from "react";
import Header from "../components/header";
import Map from "../components/map";
import Places from "../components/places";

interface HomePageProps {
    
}
 
const HomePage: React.FunctionComponent<HomePageProps> = () => {
    let [coordinates, setCoordinates]=useState({lat:0, lng:0});
    let [bounds, setBounds]=useState({});
    let [places, setPlaces]=useState([]);
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{longitude, latitude}})=>{
        setCoordinates({lat:latitude, lng:longitude})
        })
    },[])
    return (
        <div className="w-full">
            <Header setCoordinates={setCoordinates}/>
            <div className="flex w-full">
                <div className="w-5/12 max-h-screen overflow-y-scroll scroll overflow-x-hidden">
                <Places bounds={bounds} setNewPlaces={setPlaces} places={places}/>
                </div>
                <div className="w-7/12">
                <Map coordinates={coordinates} setCoordinates={setCoordinates} setBounds={setBounds} places={places}/>
                </div>
            </div>
        </div>
    );
}
 
export default HomePage;