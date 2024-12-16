import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ImageType from "../../types/image.type";

const imagesSlice = createSlice({
    name: 'images',
    initialState:[],
    reducers: {
        setImages: (state:ImageType[], action: PayloadAction<ImageType[]>) => {
            state.length=0
            state.push(...action.payload)
        }
    }
})

export const { setImages } = imagesSlice.actions

export default imagesSlice.reducer
