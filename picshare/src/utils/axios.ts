import axios from 'axios'
import { authRequestMiddleware, authResponseMiddleware } from '../auth/authMiddleware';

const baseURL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';
const privateAxiosInstance = axios.create({ baseURL })
export const publicAxiosInstance = axios.create({ baseURL })

privateAxiosInstance.interceptors.request.use(authRequestMiddleware)
privateAxiosInstance.interceptors.response.use(authResponseMiddleware)

export default privateAxiosInstance;
