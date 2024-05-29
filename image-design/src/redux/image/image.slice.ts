import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ImageType from "../../types/image.type";

const imagesSlice = createSlice({
    name: 'images',
    initialState:[],
    reducers: {
        setImages: (state:ImageType[], action: PayloadAction<ImageType[]>) => {
<<<<<<< HEAD
            state.length=0
            state.push(...action.payload)
=======
            state = action.payload
>>>>>>> 51a29fb1c023f134593ddabb8f6b8f9776eb0b94
        }
    }
})

export const { setImages } = imagesSlice.actions

<<<<<<< HEAD
export default imagesSlice.reducer
=======
export default imagesSlice.reducer
>>>>>>> 51a29fb1c023f134593ddabb8f6b8f9776eb0b94
