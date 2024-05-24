import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useAppSelector } from '../redux/store';
import { selectImages } from '../redux/image/image.selectors';
import ImageType from '../types/image.type';


export default function ImagesGallery() {
    const images: ImageType[] = useAppSelector(selectImages);
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {images.map((image) => {
                return (
                    <ImageListItem key={image.id}>
                        <img
                            srcSet={`${image.imagePath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${image.imagePath}?w=164&h=164&fit=crop&auto=format`}
                            alt={'תמונה'}
                            loading="lazy"
                        />
                    </ImageListItem>
                );
            })}
        </ImageList>
    );
}