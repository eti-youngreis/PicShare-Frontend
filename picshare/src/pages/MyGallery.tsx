import { ImageList, ImageListItem } from "@mui/material";
import { selectAuth } from "../redux/auth/auth.selectors";
import { selectImages } from "../redux/image/image.selectors";
import { useAppSelector } from "../redux/store";

export default function MyGallery(){
    const {user} = useAppSelector(selectAuth)
    const myImages = useAppSelector(selectImages).filter(image=>image.userId==user!.id)
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {myImages.map((image) => {
                return (
                    <ImageListItem key={image.id} sx={{ position: 'relative' }}>
                        <a href={image.imagePath} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
                            <img
                                srcSet={`${image.imagePath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${image.imagePath}?w=164&h=164&fit=crop&auto=format`}
                                alt={'תמונה'}
                                loading="lazy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </a>
                    </ImageListItem>
                );
            })}
        </ImageList>
    );
}