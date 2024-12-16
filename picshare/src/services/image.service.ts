import ImageType from '../types/image.type';
import axios from '../utils/axios'
const controller = "Image"

export const getAllImages = async ()=>{
    const response = await axios.get(`${controller}`)
    return response.data;
}
export const uploadImage = async (image:FormData)=>{
    const response = await axios.post(`${controller}`,image)
    console.log(response)
    return response
}
export const deleteImage = async (id:number)=>{
    const response = await axios.delete(`${controller}/${id}`)
    return response
}