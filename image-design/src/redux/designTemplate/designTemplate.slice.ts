import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import DesignTemplate from "../../types/designTemplate.type";

const designTemplatesSlice = createSlice({
    name: 'designTemplates',
    initialState:[],
    reducers: {
        setDesignTemplates: (state:DesignTemplate[], action: PayloadAction<DesignTemplate[]>) => {
            state = action.payload
        }
    }
})

export const { setDesignTemplates } = designTemplatesSlice.actions

export default designTemplatesSlice.reducer