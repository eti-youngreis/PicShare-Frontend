import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import imagesReducer from './image/image.slice'
import designTemplatesReducer from './designTemplate/designTemplate.slice'
import designedImagesReducer from './designedImage/designedImage.slice'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        images: imagesReducer,
        designedImages: designedImagesReducer,
        designTemplates: designTemplatesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector