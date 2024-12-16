import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import DesignedImage from "../../types/designedImage.type";

const designedImagesSlice = createSlice({
    name: 'designedImages',
    initialState:[],
    reducers: {
        setDesignedImages: (state:DesignedImage[], action: PayloadAction<DesignedImage[]>) => {
            state = action.payload
        }
    }
})

export const { setDesignedImages } =designedImagesSlice.actions

export default designedImagesSlice.reducer