import axios from 'axios';
const requestToPixby =axios.create({ baseURL: "https://pixabay.com/api/",
params:{
key:"41746406-765aed4a48c8fd4ed49dbad68",
image_type:"photo",
orientation: "horizontal",
per_page:12,}
});

export const getPictures=(q, page = 1)=>{
   return requestToPixby.get('/',
   {params:{
      q,
      page,}
   })
}
 

// // CjNiqUa3uLNVtFj
//API -key: 41746406-765aed4a48c8fd4ed49dbad68