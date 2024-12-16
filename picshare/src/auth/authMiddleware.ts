import { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getSession, isValidToken, removeSession } from '../auth/utils'

// בדיקת הרשאות לפני קריאת שרת
export const authRequestMiddleware = (request: InternalAxiosRequestConfig) => {
    if (request.url === '/Login') {
        return request;

    }
    const token = getSession()
    if (!token || !isValidToken(token)) {
        removeSession();
      //  Promise.reject('Unauthorized');
    }
    return request;
};

// -אחרי שחזרה תגובה בדיקת הרשאות אחרי קריאת שרת
export const authResponseMiddleware = (response: AxiosResponse) => {
    if (response.status === 401) {
        removeSession();
        Promise.reject('Unauthorized');
    }
    return response;
};