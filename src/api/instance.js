import axios from 'axios';
const instance = axios.create({
  baseURL:''
})
instance.interceptors.response.use(function(response){
  if(response.data.code == 200){
    return Promise.resolve(response.data)
  }else{
    return Promise.reject(response.data)
  }
},function(err){
  return Promise.reject(err)
})
export default instance