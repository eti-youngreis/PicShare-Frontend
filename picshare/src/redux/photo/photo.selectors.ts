import { PhotoType } from "../../types/photo.type";
import { RootState } from "../store";

export const selectPhotos = (state: RootState): PhotoType[] => state.photos