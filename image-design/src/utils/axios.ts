import axios from 'axios'
import { authRequestMiddleware, authResponseMiddleware } from '../auth/authMiddleware';

const privateAxiosInstance = axios.create({ baseURL: 'https://localhost:44357/api' })
export const publicAxiosInstance = axios.create({ baseURL: 'https://localhost:44357/api' })

privateAxiosInstance.interceptors.request.use(authRequestMiddleware)
privateAxiosInstance.interceptors.response.use(authResponseMiddleware)

export default privateAxiosInstance;
