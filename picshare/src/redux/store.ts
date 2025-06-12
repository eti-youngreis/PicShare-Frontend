import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import photoReducer from './photo/photo.slice'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        photos: photoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector