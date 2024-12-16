import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.types";

const usersSlice = createSlice({
    name: 'users',
    initialState:[],
    reducers: {
        setUsers: (state:UserType[], action: PayloadAction<UserType[]>) => {
            state.length=0
            state.push(...action.payload)
        }
    }
})

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer
