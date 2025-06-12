import { useAppSelector } from '../redux/store';
import { selectPhotos } from '../redux/photo/photo.selectors';
import PhotosGallery from './PhotosGallery';
type UserPhotosProps = {
    userId:number
}
export default function UserPhotos({userId}:UserPhotosProps) {
    const userPhotos = useAppSelector(selectPhotos).filter(photo=>photo.userId===userId)
    return <PhotosGallery/>
};
