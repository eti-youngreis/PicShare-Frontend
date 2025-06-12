import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PhotoType } from "../../types/photo.type";

const initialState: PhotoType[] = [];

const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPhotos: (state: PhotoType[], action: PayloadAction<PhotoType[]>) => {
            state.length = 0;
            state.push(...action.payload);
        },
        addPhoto: (state: PhotoType[], action: PayloadAction<PhotoType>) => {
            state.push(action.payload);
        }
    }
});

export const { setPhotos, addPhoto } = photoSlice.actions;

export default photoSlice.reducer;
