import axios from 'axios';

export let BASE_URL = "https://tgubackend.herokuapp.com/"

let options:any = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary',
    params: {
      tr_longitude: '<REQUIRED>',
      tr_latitude: '<REQUIRED>',
      bl_longitude: '<REQUIRED>',
      bl_latitude: '<REQUIRED>',
      currency: 'USD',
      lunit: 'km',
      lang: 'en_US'
    },
    headers: {
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      'x-rapidapi-key': '1957bb77bdmsh2b067057177278bp114c7fjsn79d8c76ea795'
    }
  };
  
  export let getPlaces=async(url:string, sw:any, ne:any)=>{
      try{
        options.params.tr_latitude=ne.lat;
        options.params.bl_latitude=sw.lat;
        options.params.bl_longitude=sw.lng;
        options.params.tr_longitude=ne.lng;
        options.url=url;
        let {data}=await axios.get(url, options)
        data.data=data.data.filter((d:any)=>d.name && d.ranking)
        return data;
    }catch(e){
        console.log(e);
    }
}

// let resturantUrl="https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

// export let getResturants=async(sw:any, ne:any)=>{
//   try{
//     options.params.tr_latitude=ne.lat;
//     options.params.bl_latitude=sw.lat;
//     options.params.bl_longitude=sw.lng;
//     options.params.tr_longitude=ne.lng;
//     options.url=resturantUrl;
//     const {data}=await axios.get(resturantUrl, options)
//     return data;
//   }catch(e){
//       console.log(e);
//   }
// }

// let hotelUrl="https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary";

// export let getHotels=async(sw:any, ne:any)=>{
//   try{
//     options.params.tr_latitude=ne.lat;
//     options.params.bl_latitude=sw.lat;
//     options.params.bl_longitude=sw.lng;
//     options.params.tr_longitude=ne.lng;
//     options.url=resturantUrl;
//     const {data}=await axios.get(resturantUrl, options)
//     return data;
//   }catch(e){
//       console.log(e);
//   }
// }