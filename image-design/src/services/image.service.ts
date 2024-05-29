import axios from '../utils/axios'
const controller = "Image"

export const getAllImages = async ()=>{
<<<<<<< HEAD
=======
    debugger
>>>>>>> 51a29fb1c023f134593ddabb8f6b8f9776eb0b94
    const response = await axios.get(`${controller}`)
    return response.data;
}
