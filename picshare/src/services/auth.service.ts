import axios from "../utils/axios";
import { UserSignUpType } from "../types/user.types";

const controller = 'Auth';

export const signin = async (email: string, password: string) => {
    const response = await axios.post<string>(`${controller}/signin`, { email, password });
    return response.data;
};

export const signup = async (user: UserSignUpType) => {
    const response = await axios.post(`${controller}/signup`, user);
    return response.data;
};

export const signout = async () => {
    const response = await axios.post(`${controller}/signout`);
    return response.data;
};