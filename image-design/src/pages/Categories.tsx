import React from 'react';
import ImageCategory from '../utils/category.enum';
import { useAppSelector } from '../redux/store';
import { selectImages } from '../redux/image/image.selectors';
import ImagesGallery from './ImagesGallery';
import { PATHS } from '../routes/paths';

const Categories: React.FC = () => {
    
    const imageSrc = {
        Buildings: require('../assets/images/building.jpg'),
        Animals: require('../assets/images/animal.jpg'),
        Landscapes: require('../assets/images/landscape.jpg'),
        Food: require('../assets/images/food.jpg'),
        Other: require('../assets/images/other.jpg')
    }

const allCategories = Object.keys(ImageCategory)

    const handleClick = (category: string) => {
        window.location.href = `${PATHS.CategoryImages}/${category}`
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
            {allCategories.map(category => (
                <div key={category} style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => handleClick(category)}>
                    {/* <img src={imageSrc[category]} alt={category} style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px', cursor: 'pointer' }} /> */}
                    <div>{category}</div>
                </div>
            ))}
        </div>
    );
};

export default Categories;
