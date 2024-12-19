import Carousel from '@components/carousel/Carousel';
import { bgRamdom, PROVINCES } from '@utils/constants';
import { convertStringToNumber } from '@utils/Utils';
import { useEffect, useState } from 'react';
import { factories } from '../../factory';

function TopDestination() {
  const [routerTop, setRouter] = useState([]);
  useEffect(() => {
    factories.getTopRouter().then((data) => {
      setRouter(data);
    });
  }, []);
  return (
    <section className="container mx-auto pb-16 mt-10">
      <h2 className="text-2xl font-bold mb-2">Tuyến đường phổ biến</h2>
      <div className="mt-14">
        <Carousel>
          {routerTop.map((x, index) => (
            <Card
              key={`cardtop_${index}`}
              image={
                x.gallery[0] ||
                'https://static.vexere.com/production/images/1681707544528.jpeg'
              }
              title={`${PROVINCES.find((i) => i.value === x.origin.toString()).label} - ${PROVINCES.find((i) => i.value === x.destination.toString()).label}`}
              price={convertStringToNumber(x.price)}
              bgColor={bgRamdom[Math.floor(Math.random() * bgRamdom.length)]}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

const Card = ({ image, title, price, bgColor }) => (
  <div className="rounded-lg overflow-hidden shadow-lg ml-3">
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="w-full object-cover aspect-[600/300]"
      />
    </div>
    <div className={`p-4 ${bgColor}`}>
      <h2 className="text-white text-lg font-bold">{title}</h2>
      <p className="text-white">{price}</p>
    </div>
  </div>
);

export default TopDestination;
