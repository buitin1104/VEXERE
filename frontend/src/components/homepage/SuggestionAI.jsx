import { RouterPath } from '@router/RouterPath';
import { convertStringToNumber } from '@utils/Utils';
import { Link } from 'react-router-dom';

function SuggestionAI() {
  return (
    <div>
      <section className="container mx-auto pb-16">
        <h2 className="mb-8 text-2xl font-extrabold">Gợi ý cho bạn</h2>
        <div className="grid grid-cols-3 gap-8">
          <CardDestination
            name="Xe Hoàng Long"
            rate={8}
            src={
              'https://static.vexere.com/production/images/1732087569487.jpeg?w=250&h=250'
            }
            from={'Đà Nẵng'}
            to="Quy Nhơn"
            comments={29}
            price="120.000"
          />
          <CardDestination
            name="Đà Lạt ơi"
            rate={8.8}
            src={
              'https://static.vexere.com/production/images/1723530067929.jpeg?w=250&h=250'
            }
            from={'Đà Nẵng'}
            to="Quy Nhơn"
            comments={130}
            price="220.000"
          />

          <CardDestination
            name="Long Vân Lemouse"
            rate={8.8}
            src={
              'https://static.vexere.com/production/images/1694430418331.jpeg?w=250&h=250'
            }
            price="320.000"
            from={'Đà Nẵng'}
            to="Quy Nhơn"
            comments={130}
          />
          <CardDestination
            name="Bình Minh BUS"
            price="320.000"
            rate={8.8}
            src={
              'https://static.vexere.com/production/images/1732087569487.jpeg?w=250&h=250'
            }
            from={'Đà Nẵng'}
            to="Quy Nhơn"
            comments={130}
          />
          <CardDestination
            name="Hạnh CAFE"
            price="320.000"
            rate={8.8}
            from={'Đà Nẵng'}
            to="Quy Nhơn"
            src={
              'https://static.vexere.com/production/images/1728527263430.jpeg?w=250&h=250'
            }
            comments={130}
          />
        </div>
      </section>
    </div>
  );
}

export default SuggestionAI;

function CardDestination({
  name,
  price,
  src,
  rate = 8.9,
  from,
  to,
  comments = 0,
}) {
  return (
    <Link
      to={`${RouterPath.DETAIL}`}
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
            {from} - {to}
          </p>
          <div className="flex items-center">
            <span className="rounded-md bg-blue-600 px-2 py-1 text-sm text-white">
              {rate}
            </span>
            <span className="ml-2 text-gray-600">{comments} đánh giá</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
