import React, { useState } from "react";

interface PriceRangeProps {
  min: number;
  max: number;
  step?: number;
  onChange: (minPrice: number, maxPrice: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeProps> = ({ min, max, step = 1, onChange }) => {
  const [minPrice, setMinPrice] = useState<number>(min);
  const [maxPrice, setMaxPrice] = useState<number>(max);

  // Handle minimum price change
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value <= maxPrice - step) {
      setMinPrice(value);
      onChange(value, maxPrice);
    }
  };

  // Handle maximum price change
  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= minPrice + step) {
      setMaxPrice(value);
      onChange(minPrice, value);
    }
  };

    // Calculate progress bar width based on min/max values
    const progressStyle = {
        left: `${((minPrice - min) / (max - min)) * 100}%`,
        width: `${((maxPrice - minPrice) / (max - min)) * 100}%`,
      };

  return (
    <div className="w-[100%] p-6 bg-white rounded-lg">
      {/* Label */}
      <div className="w-full flex justify-between mt-4 mb-4 text-sm relative">
        <span className="absolute bg-black text-white p-1 px-4 rounded-lg -left-4 -top-6">N{minPrice}</span>
        <span className="absolute bg-black text-white p-1 px-4 rounded-lg -right-4 -top-6">N{maxPrice}</span>
      </div>

      {/* Range Slider Container */}
      <div className="relative w-full">
         {/* Background Track */}
         <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 rounded-full transform -translate-y-1/2" />

        {/* Progress Bar (Dynamic Red) */}
        <div
        className="absolute top-1/2 h-2 bg-[#E31E24] rounded-full transform -translate-y-1/2"
        style={progressStyle}
        />

        {/* Min Price Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minPrice}
          onChange={handleMinChange}
          className='absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-just-red [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer'
        />

        {/* Max Price Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxPrice}
          onChange={handleMaxChange}
          className='absolute w-full  h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:bg-just-red [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer'
        />
      </div>

    </div>
  );
};

export default PriceRangeSlider;