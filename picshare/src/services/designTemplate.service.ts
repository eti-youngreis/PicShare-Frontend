import axios from '../utils/axios'
const controller = "DesignTemplate"

export const getAllTemplates = async ()=>{
    const response = await axios.get(`${controller}`)
    return response.data;
}
