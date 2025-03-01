import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';

interface RatingProps {
    totalStars?: number;
    initialRating?: number;
    onChange?: (rating: number) => void;
    rating?: number;
    readonly?: boolean;
}

const Rating = ({ totalStars = 5, initialRating = 0, onChange, rating, readonly = false }: RatingProps) => {
    const [currentRating, setCurrentRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    const handleStarClick = (index: number) => {
        if (readonly) return;
        const newRating = index + 1;
        setCurrentRating(newRating);
        if (onChange) {
            onChange(newRating);
        }
    };

    const handleStarHover = (index: number) => {
        if (readonly) return;
        setHoverRating(index + 1);
    };

    const handleMouseLeave = () => {
        if (readonly) return;
        setHoverRating(0);
    };

    const displayRating = hoverRating || rating || currentRating;

    return (
        <div onMouseLeave={handleMouseLeave} style={{ display: 'flex', gap: '4px', cursor: readonly ? 'default' : 'pointer' }}>
            {[...Array(totalStars)].map((_, index) => (
                <FaStar
                    key={index}
                    size={18}
                    color={index < displayRating ? '#ffc107' : '#e4e5e9'}
                    onMouseEnter={() => handleStarHover(index)}
                    onClick={() => handleStarClick(index)}
                />
            ))}
        </div>
    );
};

export default Rating;
