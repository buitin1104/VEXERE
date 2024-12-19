import React, { useState } from 'react';

export default function Carousel({
  children,
  pressNext,
  pressPrev,
  itemsPerSlide = 3,
  cardWidth = 280,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = React.Children.count(children);
  const maxIndex = Math.ceil(totalItems / itemsPerSlide) - 1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      if (pressPrev) pressPrev(newIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      if (pressNext) pressNext(newIndex);
    }
  };

  // Tính toán tổng chiều rộng
  const totalWidth = totalItems * cardWidth;

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * cardWidth * itemsPerSlide}px)`, // Dịch chuyển theo chiều rộng của card
            width: `${totalWidth}px`, // Tổng chiều rộng cho tất cả các item
          }}
        >
          {React.Children.map(children, (child, index) => (
            <button
              key={index}
              style={{ width: `${cardWidth}px` }}
              className="flex-shrink-0"
              onClick={() => {
                console.log(`Card ${index} clicked`);
                if (child.props.onClick) child.props.onClick(index); // Call child's onClick if provided
              }}
            >
              {child}
            </button>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="bg-gray-700 z-10 bg-opacity-50 absolute top-1/2 left-0 transform -translate-y-1/2 text-white px-2 py-2 rounded-full"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={handleNext}
          className="bg-gray-700 bg-opacity-50 absolute top-1/2 right-0 transform -translate-y-1/2 text-white px-2 py-2 rounded-full"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
