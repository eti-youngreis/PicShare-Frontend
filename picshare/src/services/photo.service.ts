import axios from '../utils/axios'
const controller = "Photo"

export const getAllPhotos = async () => {
    const response = await axios.get(`${controller}/all`);
    return response.data;
}

export const getCurrentUserPhotos = async () => {
    const response = await axios.get(`${controller}/my-photos`);
    return response.data;
}

export const uploadPhoto = async (photo: FormData) => {
    const response = await axios.post(`${controller}/upload`, photo);
    return response;
}

export const deletePhoto = async (id: number) => {
    const response = await axios.delete(`${controller}/${id}`);
    return response;
}