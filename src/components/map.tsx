import GoogleMapReact from 'google-map-react'
import { useSelector } from 'react-redux';
interface MapProps {
    coordinates:{
        lng:number,
        lat:number
    },
    setCoordinates:any,
    setBounds:any
    places:Array<any>
}
 
const Map: React.FunctionComponent<MapProps> = ({coordinates, setCoordinates, setBounds, places}) => {
    let refs=useSelector((state:any)=>state.currentDetails.refs);
    let handleClick=(i:number)=>{
        refs[i].current.scrollIntoView();
    }
    return (
        <div className='w-full bg-black my-2' style={{height:"80vh"}}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBOIGK-Zo4z2dZmzq-dJ4o75JPvezT6rKU' }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            onChange={(e)=>{
                console.log(e)
                setCoordinates(e.center)
                setBounds(e.bounds)
            }}
            onChildClick={()=>{}}
            // options={}
            >
                {places && places.map((data, i)=>
                //@ts-ignore
                    <div  lng={Number(data.longitude)} lat={Number(data.latitude)} key={i} className='w-20 absolute bg-white p-2 rounded overflow-hidden shadow-lg cursor-pointer card z-0' onClick={()=>handleClick(i)}>
                        <h2>{data.name}</h2>
                        <img className="w-full" src={data.photo?.images?.small?.url?data.photo?.images?.medium?.url:"https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"}></img>
                    </div>
                )}
            </GoogleMapReact>
        </div>
    );
}
 
export default Map;