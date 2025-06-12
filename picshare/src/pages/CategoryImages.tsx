import { selectPhotos } from "../redux/photo/photo.selectors";
import { useAppSelector } from "../redux/store";
import {PhotoCategory} from "../utils/category.enum";
import PhotosGallery from "./PhotosGallery";
type CategoryImagesProps = {
    category: PhotoCategory
}
export default function CategoryImages({category}:CategoryImagesProps){
    // const images = useAppSelector(selectPhotos).filter(image=>image.category===category)
    return <PhotosGallery/>
}