import axios from "../utils/axios";
const controller = 'User'
// export const getUsers = async () => {
//     const response = await axios.get('/User')
//     return response.data
// };

export const addUser = async (user: FormData) => {
    const response = await axios.post(`${controller}/SignUp`, user)
    return response.data
};

export const getUser = async (token: string) => {
    const response = await axios.get(`${controller}`, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
}

export const getAllUsers = async () => {
    const response = await axios.get(`${controller}/GetAll`)
    return response.data
}

export const updateProfile = async (id:number, updatedProfile:FormData) => {
    const response = await axios.put(`${controller}/${id}`, updatedProfile)
    return response
}