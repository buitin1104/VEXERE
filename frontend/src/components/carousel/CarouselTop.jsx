import { RouterPath } from '@router/RouterPath';
import { PROVINCES } from '@utils/constants';
import React, { useState } from 'react';
import useRouter from '../../hook/use-router';

export default function CarouselTop({
  routerTop,
  itemsPerSlide = 3,
  cardWidth = 280,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = routerTop.length || 0;
  const maxIndex = Math.ceil(totalItems / itemsPerSlide) - 1;
  const router = useRouter();
  const bgRamdom = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-gray-500',
    'bg-lime-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-fuchsia-500',
    'bg-rose-500',
    'bg-brown-500',
    'bg-deep-purple-500',
    'bg-light-blue-500',
    'bg-light-green-500',
    'bg-khaki-500',
    'bg-mint-500',
    'bg-coral-500',
    'bg-turquoise-500',
    'bg-silver-500',
    'bg-maroon-500',
    'bg-olive-500',
    'bg-crimson-500',
  ];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Tính toán tổng chiều rộng
  const totalWidth = totalItems * cardWidth;

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden w-full items-center flex flex-row flex-1">
        <button
          onClick={handlePrev}
          className="relative z-20 left-1 bg-gray-700 bg-opacity-50  text-white px-2 py-2 rounded-full"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div
          className=" flex transition-transform duration-300 w-[70%]"
          style={{
            transform: `translateX(-${currentIndex * cardWidth * itemsPerSlide}px)`,
            width: `${totalWidth}px`,
          }}
        >
          {routerTop.map((x, index) => (
            <CardTD
              key={`cardtop_${index}`}
              image={
                x.gallery[0] ||
                'https://static.vexere.com/production/images/1681707544528.jpeg'
              }
              title={`${PROVINCES.find((i) => i.value === x.origin.toString()).label} - ${PROVINCES.find((i) => i.value === x.destination.toString()).label}`}
              from={x.origin.toString()}
              to={x.destination.toString()}
              bgColor={bgRamdom[Math.floor(Math.random() * bgRamdom.length)]}
              onClick={() => {
                const newParams = {
                  fromCity: x.origin,
                  toCity: x.destination,
                  departureDateTime: new Date(),
                };
                router.push({
                  pathname: RouterPath.SEARCH,
                  params: newParams,
                });
              }}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-1  bg-gray-700 bg-opacity-50 text-white px-2 py-2 rounded-full"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

const CardTD = ({ image, title, price, bgColor, onClick }) => {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg ml-3 z-[0] cursor-pointer w-[300px]"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full object-cover aspect-[600/300]"
        />
      </div>
      <div className="bg-red z-50">
        <div className={`p-4 ${bgColor}`}>
          <h2 className="text-white text-lg font-bold">{title}</h2>
          <p className="text-white">{price}</p>
        </div>
      </div>
    </div>
  );
};
