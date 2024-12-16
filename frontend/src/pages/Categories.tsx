import React from 'react';
import { HebrewImageCategory, ImageCategory } from '../utils/category.enum';
import { PATHS } from '../routes/paths';

const Categories: React.FC = () => {
    const imageSrc = {
        Buildings: require('../assets/images/building.jpg'),
        Animals: require('../assets/images/animal.jpg'),
        Landscapes: require('../assets/images/landscape.jpg'),
        Food: require('../assets/images/food.jpg'),
        Other: require('../assets/images/other.jpg')
    };

    const handleCategoryClick = (category: string) => {
        // window.location.href = `${PATHS.Home}/${PATHS.CategoryImages}/${category}`;
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
            {Object.keys(ImageCategory).map((category) => (
                <div
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    style={{
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <img
                        src={imageSrc[category as keyof typeof imageSrc]}
                        alt={category}
                        style={{
                            ...imageSize,
                            objectFit: 'cover',
                            transition: 'transform 0.2s, box-shadow 0.2s', // אפקט מעבר בעת העכבר עובר מעל התמונה
                            border: '2px solid #ccc', // מסגרת עדינה
                            borderRadius: '10px', // פינות עגולות
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
                        {HebrewImageCategory[category as keyof typeof HebrewImageCategory]}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Categories;
