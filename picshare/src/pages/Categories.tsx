import React from 'react';
import { HebrewPhotoCategory, PhotoCategory } from '../utils/category.enum';
import { PATHS } from '../routes/paths';

const Categories: React.FC = () => {
    const photoSrc = {
        Buildings: require('../assets/photos/building.jpg'),
        Animals: require('../assets/photos/animal.jpg'),
        Landscapes: require('../assets/photos/landscape.jpg'),
        Food: require('../assets/photos/food.jpg'),
        Other: require('../assets/photos/other.jpg')
    };

    const handleCategoryClick = (category: string) => {
        window.location.href = `${PATHS.Home}/${category}`;
    };

    const imageSize = {
        width: '200px',
        height: '200px'
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '25px', // רווח בין התמונות
            flexWrap: 'wrap', // במקרה שהתמונות לא נכנסות בשורה אחת
            marginTop: '70px'
        }}>
            {Object.keys(PhotoCategory).map((category) => (
                <div
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    style={{
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <img
                        src={photoSrc[category as keyof typeof photoSrc]}
                        alt={category}
                        style={{
                            ...imageSize,
                            objectFit: 'cover',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            border: '2px solid #ccc',
                            borderRadius: '10px',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)';
                            (e.currentTarget as HTMLImageElement).style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                            (e.currentTarget as HTMLImageElement).style.boxShadow = 'none';
                        }}
                    />
                    <p style={{
                        marginTop: '10px',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}>
                        {HebrewPhotoCategory[category as keyof typeof HebrewPhotoCategory]}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Categories;
