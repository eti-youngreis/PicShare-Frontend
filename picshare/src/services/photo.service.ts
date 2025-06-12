import axios from '../utils/axios'
const controller = "Photo"

export const getAllImages = async ()=>{
    const response = await axios.get(`${controller}`)
    return response.data;
}
export const uploadPhoto = async (photo:FormData)=>{
    const response = await axios.post(`${controller}`,photo)
    return response
}
export const deletePhoto = async (id:number)=>{
    const response = await axios.delete(`${controller}/${id}`)
    return response
}