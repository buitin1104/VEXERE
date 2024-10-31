import { Image } from '@nextui-org/react';
import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hàm chuyển ảnh
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="text-center w-full flex flex-col justify-center">
      <div className="relative inline-block ">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg aspect-video border "
        />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 opacity-50 text-white px-2 py-2 text-lg rounded-full hover:bg-gray-800"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white px-2 opacity-50 py-2 text-lg rounded-full hover:bg-gray-800"
        >
          ❯
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2 w-full">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(index)}
            className={`w-24 h-16 object-cover cursor-pointer border-2 ${
              currentIndex === index ? 'border-black' : 'border-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
