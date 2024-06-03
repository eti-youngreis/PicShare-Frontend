import * as React from 'react';
import ImageType from '../types/image.type';
import { useAppSelector } from '../redux/store';
import { selectImages } from '../redux/image/image.selectors';

const UserImages: React.FC = () => {

    const url = window.location.href
    const index = url.lastIndexOf('/')
    const dd = url.substring(index + 1)
    const images = useAppSelector(selectImages).filter(image => image.userId.toString() === dd)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {images.map((image, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                        <img src={image.imagePath} alt={`Image ${index}`} style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '10px' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserImages;
