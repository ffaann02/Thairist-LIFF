const Rating = ({ rating }) => {
    const totalStars = 5; // Assuming you have a total of 5 stars



    return (
        <div className="rating my-1 w-full">
            {Array.from({ length: totalStars }).map((_, index) => (
                <input
                    key={index}
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    checked={index < rating} // Set checked if index is less than the rating
                    readOnly
                />
            ))}
        </div>
    );
}

export default Rating;