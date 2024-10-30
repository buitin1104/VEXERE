import Carousel from '@components/carousel/Carousel';
import { topDestination } from '@pages/detail/mock';

function TopDestination() {
  return (
    <section className="container mx-auto pb-16 mt-10">
      <h2 className="text-2xl font-bold mb-2">Tuyến đường phổ biến</h2>
      <div className="mt-14">
        <Carousel>
          {topDestination.map((x, index) => (
            <Card
              key={`cardtop_${index}`}
              image={x.image}
              title={x.title}
              price={x.price}
              bgColor={x.bgColor}
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
