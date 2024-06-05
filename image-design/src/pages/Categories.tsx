import React from 'react';
import {HebrewImageCategory, ImageCategory} from '../utils/category.enum'
import { PATHS } from '../routes/paths';

const Categories: React.FC = () => {
    const imageSrc = {
        Buildings: require('../assets/images/building.jpg'),
        Animals: require('../assets/images/animal.jpg'),
        Landscapes: require('../assets/images/landscape.jpg'),
        Food: require('../assets/images/food.jpg'),
        Other: require('../assets/images/other.jpg')
    }

    const handleCategoryClick = (category:string) => {
       window.location.href=`${PATHS.Home}/${PATHS.CategoryImages}/${category}`
    }

    return (
        <div>
            {Object.keys(ImageCategory).map((category) => (
                <div key={category} onClick={() => handleCategoryClick(category)}>
                        <img src={imageSrc[category as keyof typeof imageSrc]} alt={category} style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        <p>{ImageCategory[category as keyof typeof HebrewImageCategory]}</p>
                </div>
            ))}
        </div>
    );
}

export default Categories;
