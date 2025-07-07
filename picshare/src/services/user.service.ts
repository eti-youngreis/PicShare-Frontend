import axios from "../utils/axios";
import { UserUpdateType } from "../types/user.types";

const controller = 'User'

export const getCurrentUser = async () => {
    const response = await axios.get(`${controller}/profile`);
    return response.data;
}

export const getAllUsers = async () => {
    const response = await axios.get(`${controller}/all`);
    return response.data;
}

export const editProfile = async (updatedProfile: UserUpdateType) => {
    const formData = new FormData();
    if (updatedProfile.fullName) {
        formData.append('fullName', updatedProfile.fullName);
    }
    if (updatedProfile.profilePicture) {
        formData.append('profilePicture', updatedProfile.profilePicture);
    }

    const response = await axios.put(`${controller}/profile`, formData);
    return response.data;
}