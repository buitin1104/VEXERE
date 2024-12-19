import CarouselTop from '@components/carousel/CarouselTop';
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
        <CarouselTop routerTop={routerTop} />
      </div>
    </section>
  );
}

export default TopDestination;
