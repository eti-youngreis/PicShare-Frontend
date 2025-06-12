import axios from "../utils/axios";

export const setSession = (token: string) => {
    console.log("setSession")
    localStorage.setItem('token', token)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const getSession = (): string | null => {
    // const token: string = JSON.parse(localStorage.getItem('token') || 'null')
    const token: string|null = localStorage.getItem('token') || null
    return token
}


export const removeSession = () => {
    localStorage.removeItem('token')
    axios.defaults.headers.common.Authorization = undefined;
    // window.location.href = PATHS.signIn;
}

export function jwtDecode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload);
}

export const isValidToken = (token: string) => {
    if (!token) {
        return false;
    }

    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};
