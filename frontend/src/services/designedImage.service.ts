import axios from '../utils/axios'
const controller = "DesignedImages"

export const getAllDesignedImages = async ()=>{
    const response = await axios.get(`${controller}`)
    return response.data;
}
