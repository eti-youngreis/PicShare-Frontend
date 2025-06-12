import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useAppSelector } from '../redux/store';
import { selectPhotos } from '../redux/photo/photo.selectors';
import { PhotoType } from '../types/photo.type';


export default function PhotosGallery() {
    const photos: PhotoType[] = useAppSelector(selectPhotos);
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {photos.map((photo) => {
                return (
                    <ImageListItem key={photo.id}>
                        <img
                            srcSet={`${photo.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${photo.url}?w=164&h=164&fit=crop&auto=format`}
                            alt={'תמונה'}
                            loading="lazy"
                        />
                    </ImageListItem>
                );
            })}
        </ImageList>
    );
}