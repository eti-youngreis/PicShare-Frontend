import axios from '../utils/axios'
const controller = "Image"

export const getAllImages = async ()=>{
    const response = await axios.get(`${controller}`)
    return response.data;
}
