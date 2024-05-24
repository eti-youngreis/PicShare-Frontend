import { FullUserType } from "../types/user.types";
import axios from "../utils/axios";
const controller = 'User'
// export const getUsers = async () => {
//     const response = await axios.get('/User')
//     return response.data
// };

export const addUser = async (user: FullUserType) => {
    console.log('addUser')
    const response = await axios.post(`${controller}/SignUp`, user)
    return response.data
};

export const getUser = async (token: string) => {
    const response = await axios.get(`${controller}`, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
}
