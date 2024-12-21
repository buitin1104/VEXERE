import { RouterPath } from '@router/RouterPath';
import { PROVINCES } from '@utils/constants';
import { convertStringToNumber } from '@utils/Utils';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { factories } from '../../factory';
import useRouter from '../../hook/use-router';

function SuggestionAI() {
  const [sugesstion, setRouter] = useState([]);
  const { auth } = useAuth();
  useEffect(() => {
    if (!auth) return;
    factories
      .getRecommend({
        id: auth._id,
      })
      .then((data) => {
        setRouter(data.recommendations);
      });
  }, [auth]);
  if (!auth) return <></>;
  return (
    <div>
      <section className="container mx-auto pb-16">
        <h2 className="mb-8 text-2xl font-extrabold">Gợi ý cho bạn</h2>
        <div className="grid grid-cols-3 gap-8">
          {sugesstion?.map((item, index) => (
            <CardDestination
              key={index}
              id={item._id}
              name={item.bus.owner.branchName}
              rate={item.rate}
              src={item.bus.gallery[0]}
              from={item.origin.city}
              to={item.destination.city}
              price={item.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default SuggestionAI;

function CardDestination({ id, name, price, src, from, to }) {
  const router = useRouter();

  function handleSearch() {
    const newParams = {
      fromCity: from,
      toCity: to,
      busTripId: id,
      branchName: name,
    };
    router.push({
      pathname: RouterPath.SEARCH,
      params: newParams,
    });
  }
  return (
    <button
      onClick={handleSearch}
      className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-100 ease-in-out hover:scale-105 hover:shadow-2xl"
    >
      <img
        alt={`r_${name}`}
        className="h-48 w-full object-cover"
        src={src ? src : 'https://placehold.co/400x300'}
      />
      <div className="p-4 ">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{name}</h3>
          <p>{convertStringToNumber(price)}</p>
        </div>
        <div className="flex mt-2 justify-between items-center">
          <p className="text-gray-600">
            {PROVINCES.find((p) => p.value === from)?.label} -{' '}
            {PROVINCES.find((p) => p.value === to)?.label}
          </p>
        </div>
      </div>
    </button>
  );
}
