import * as React from 'react';
import ImageType from '../types/image.type';
import { useAppSelector } from '../redux/store';
import { selectImages } from '../redux/image/image.selectors';
import ImagesGallery from './ImagesGallery';
type UserImagesProps = {
    userId:number
}
export default function UserImages({userId}:UserImagesProps) {
    const userImages = useAppSelector(selectImages).filter(image=>image.userId===userId)
    return <ImagesGallery images={userImages}/>
};
