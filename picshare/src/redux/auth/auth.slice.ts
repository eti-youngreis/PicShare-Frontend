import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.types";

type AuthStateType = {
    user: UserType | null,
    isAuthenticated: boolean,
    isInitialized: boolean

}

const initialState: AuthStateType = {
    user: null,
    isAuthenticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: AuthStateType, action: PayloadAction<UserType>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setInitialized: (state: AuthStateType) => {
            state.isInitialized = true
        }
    }
})

export const { setUser, setInitialized } = authSlice.actions

export default authSlice.reducer