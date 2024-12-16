import { useAppSelector } from "../redux/store";
import { selectUsers } from "../redux/user/user.selectors";

export default function Photographers(){
    const users = useAppSelector(selectUsers)
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