import { selectImages } from "../redux/image/image.selectors";
import { useAppSelector } from "../redux/store";
import {ImageCategory} from "../utils/category.enum";
import ImagesGallery from "./ImagesGallery";
type CategoryImagesProps = {
    category: ImageCategory
}
export default function CategoryImages({category}:CategoryImagesProps){
    const images = useAppSelector(selectImages).filter(image=>image.category===category)
    return <ImagesGallery images={images}/>
}