import axios from "../utils/axios";
const controller='User'

export const signin = async (email: string, password: string) => {
    const response = await axios.post<string>(`${controller}/SignIn`, { email, password })
    return response.data
};