import SteeringWheelIcon from '@assets/base/icon/SteeringWheelIcon';
import ImageGallery from '@components/galery/Galery';
import Review from '@components/review';
import { Button, Chip, ScrollShadow, Tab, Tabs } from '@nextui-org/react';
import { RouterPath } from '@router/RouterPath';
import { AMENITIES, BUSES_LIST, PROVINCES } from '@utils/constants';
import { differenceInHours } from '@utils/dateTime';
import { cn, convertStringToNumber, getDate } from '@utils/Utils';
import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { factories } from '../../../factory';
import useRouter from '../../../hook/use-router';

export default function SearchResult({ data }) {
  const router = useRouter();
  const {
    fromCity,
    toCity,
    departureDateTime,
    amenities,
    isWithPet,
    price,
    page = 1,
    limit = 10,
    sort,
    type,
  } = router.getAll();
  const priceList = useMemo(() => {
    return price?.split(',');
  }, [price]);

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-bold text-2xl">
        Kết quả: {data?.pagination?.total ?? 0} chuyến xe
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        <Chip color="primary" className="text-white">
          Khởi hành: {getDate(departureDateTime, 5)}
        </Chip>
        {sort && (
          <Chip color="success" className="text-white">
            {sort}
          </Chip>
        )}
        {amenities?.split(',')?.map((item, index) => {
          const data = AMENITIES.find((x) => x.id === item)?.name;
          if (data) {
            return (
              <Chip key={index} color="success" className="text-white">
                {data}
              </Chip>
            );
          }
          return null;
        })}
        {priceList && (
          <Chip color="warning" className="text-white">
            Giá: {priceList[0]} - {priceList[1]}
          </Chip>
        )}
      </div>
      <div className="w-full flex flex-col gap-5">
        {data?.busTrips?.map((x) => (
          <CardSearch item={x} />
        ))}
      </div>
    </div>
  );
}

function CardSearch({ item }) {
  const [showDetail, setShowDetail] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [reviews, setReview] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (item?.bus) {
      loadReview(item.bus._id);
    }
  }, [item?.bus]);
  function loadReview(id) {
    factories.getBusReview(id).then((data) => {
      setReview(data.reviews);
      setReviewCount(data.averageStar);
    });
  }
  return (
    <div className="w-full flex flex-col mx-auto p-4 bg-white border hover:shadow-xl rounded-lg">
      <div className="flex">
        <div className="relative">
          <img
            src={
              item?.bus.gallery[0] ??
              'https://static.vexere.com/production/images/1716953194738.jpeg?w=250&h=250'
            }
            alt="Bus image"
            className="h-52 rounded-md aspect-square"
          />
        </div>
        <div className="ml-4 flex-1 ">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {PROVINCES.find((x) => x.value === item?.origin.city).label}{' '}
                {` - `}
                {
                  PROVINCES.find((x) => x.value === item?.destination.city)
                    .label
                }
              </h2>
              <div className="text-md font-bold text-grey-500">
                {
                  BUSES_LIST.find(
                    (x) => x.id.toString() === item?.bus?.busModel,
                  )?.label
                }
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-blue-600 text-lg font-bold">
                Giá vé: {convertStringToNumber(item?.price)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="bg-blue-500 text-white px-2 py-1 rounded-md">
                  {reviews?.length === 0 && 'Chưa có đánh giá'}
                  {reviewCount && <p>{reviewCount}</p>}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center text-gray-700">
              <i className="fas fa-map-marker-alt text-blue-500"></i>
              <span className="ml-2 font-bold text-lg">
                {getDate(item?.departureTime, 6)}
              </span>
              <span className="ml-2">- {item?.origin.name}</span>
            </div>
            <div className="ml-6 text-gray-500">
              {differenceInHours(
                new Date(item?.departureTime),
                new Date(item?.arrivalTime),
              )}
              h
            </div>
            <div className="flex items-center text-gray-700">
              <i className="fas fa-map-marker-alt text-red text-sm"></i>
              <span className="ml-2 font-bold text-lg">
                {getDate(item?.arrivalTime, 6)}
              </span>
              <span className="ml-2">- {item?.destination.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-0 mb-2 w-full ">
        <div className="flex flex-col ">
          <div className="text-lg text-content font-bold">
            {item?.amenity?.includes('F1') && 'KHÔNG CẦN THANH TOÁN TRƯỚC'}
          </div>
          <div className="text-gray-500">
            Còn{' '}
            {BUSES_LIST.find((x) => x.id == item.bus.busModel)?.seats -
              item.ticketBooked.length}
            {` `}
            chỗ trống
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Button
            variant="shadow"
            color="warning"
            className=" text-white"
            onClick={() => {
              setShowBooking(!showBooking);
              setShowDetail(false);
            }}
          >
            Chọn chuyến
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setShowBooking(false);
              setShowDetail(!showDetail);
            }}
            className=" border-none text-sm cursor-pointer"
          >
            Thông tin chi tiết <i className="fas fa-chevron-down"></i>
          </Button>
        </div>
      </div>

      {showDetail && (
        <>
          <div className="mt-4">
            <div className="flex flex-wrap gap-4 mb-4">
              <Tabs
                variant="dark"
                color="primary"
                aria-label="Tabs colors"
                className=""
                radius="full"
              >
                <Tab
                  key="policy"
                  title="Chính sách"
                  className="flex items-center justify-center w-full"
                >
                  <div className="w-full bg-neutral-100 p-4 rounded-md">
                    {!item.policy ? (
                      <p>Chưa có chính sách nào được thêm</p>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: item.policy }}
                      ></div>
                    )}
                  </div>
                </Tab>
                <Tab
                  key="photos"
                  title="Hình ảnh"
                  className="flex items-center justify-center w-full"
                >
                  <div className="w-full flex justify-center items-center">
                    <div className="w-[600px]">
                      <ImageGallery images={item.bus.gallery} />
                    </div>
                  </div>
                </Tab>
                <Tab key="rate" title="Đánh giá">
                  <div className="w-full flex justify-center items-center">
                    {reviews?.length === 0 ? (
                      'Chưa có đánh giá'
                    ) : (
                      <ScrollShadow className="w-full min-h-[230px] max-h-[600px]">
                        {reviews.map((review) => (
                          <Review key={review.id} review={review} />
                        ))}
                      </ScrollShadow>
                    )}
                  </div>
                </Tab>

                <Tab key="feature" title="Tiện ích">
                  <div className="flex justify-start items-start flex-wrap gap-8 w-full p-6 rounded-lg">
                    {item.amenity.map((x) => {
                      const itemAM = AMENITIES.find((y) => y.id === x);
                      return (
                        <div
                          key={itemAM.id}
                          className="flex items-center min-w-[100px] gap-3"
                        >
                          <div className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded">
                            <i className={`${itemAM?.icon}`}></i>
                          </div>
                          <span className="text-black">{itemAM?.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </>
      )}

      {showBooking && (
        <BookingSection
          item={item}
          busModel={item.bus.busModel}
          seatsLocked={item.ticketBooked}
          price={item.price}
        />
      )}
    </div>
  );
}

function BookingSection({ item, busModel, seatsLocked, price }) {
  const { auth } = useAuth();
  const bus = BUSES_LIST.find((b) => b.id == busModel);
  const [selectedSeats, setSelectedSeats] = useState([]);
  // Kiểm tra nếu xe trên 30 chỗ thì chia thành hai tầng
  const totalSeats = bus.seats;
  const isDoubleDeck = bus.levels === 2;
  const seatsPerRow = bus.seatsPerRow;
  const seatsPerFloor = isDoubleDeck ? Math.ceil(totalSeats / 2) : totalSeats;
  const rowsPerLevel = bus.rowsPerLevel; // Số hàng trên mỗi tầng
  const router = useRouter();
  // Hàm xử lý chọn ghế
  const toggleSeatSelection = (seatNumber) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatNumber)
        ? prevSelected.filter((seat) => seat !== seatNumber)
        : [...prevSelected, seatNumber],
    );
  };
  function confirmBooking() {
    const ticket = {
      ...item,
      seats: selectedSeats,
    };
    const encodedItem = encodeURIComponent(JSON.stringify(ticket));
    router.push({
      pathname: RouterPath.CONFIRM_INFORMATION,
      params: {
        item: encodedItem,
      },
    });
  }
  // Hàm render ghế cho một tầng
  const renderSeats = (startSeatNumber, totalSeatsInFloor) => {
    const rows = [];
    const totalRows = Math.ceil(totalSeatsInFloor / seatsPerRow);
    // Render các hàng chính
    for (let i = 0; i < Math.min(rowsPerLevel, totalRows); i++) {
      const seats = [];
      for (let j = 0; j < seatsPerRow; j++) {
        const seatNumber = startSeatNumber + j * rowsPerLevel + i;
        if (seatNumber > startSeatNumber + totalSeatsInFloor - 1) break;
        const isLocked = seatsLocked.includes(seatNumber);
        seats.push(
          <div
            key={seatNumber}
            onClick={() => !isLocked && toggleSeatSelection(seatNumber)}
            className={cn(
              'relative border-grey-600 w-6 h-12 border-2 rounded flex pt-2 justify-center cursor-pointer',
              isLocked
                ? 'bg-grey-200 border-grey-600 items-center pt-0'
                : selectedSeats.includes(seatNumber)
                  ? 'bg-green-300 border-green-600'
                  : 'bg-gray-100',
            )}
          >
            {isLocked ? (
              <i className="fa fa-lock text-white"></i>
            ) : (
              <>
                <p
                  className={cn(
                    'text-sm select-none',
                    selectedSeats.includes(seatNumber) && 'text-white',
                  )}
                >
                  {seatNumber}
                </p>
                <div className="absolute bottom-1 border border-grey-900 w-4/5 rounded-md shadow-sm h-2"></div>
              </>
            )}
          </div>,
        );
      }
      rows.push(
        <div key={i} className="flex justify-between gap-4 mb-2">
          {seats}
        </div>,
      );
    }

    // Render hàng cuối cùng nếu có ghế còn lại
    const lastRowStartSeat = startSeatNumber + rowsPerLevel * seatsPerRow;
    const lastRowSeats = totalSeatsInFloor - rowsPerLevel * seatsPerRow;

    if (lastRowSeats > 0) {
      const lastRow = [];
      for (let j = 0; j < lastRowSeats; j++) {
        const seatNumber = lastRowStartSeat + j;

        const isLocked = seatsLocked.includes(seatNumber);
        lastRow.push(
          <div
            key={seatNumber}
            onClick={() => !isLocked && toggleSeatSelection(seatNumber)}
            className={cn(
              'relative border-grey-600 w-6 h-12 border-2 rounded flex pt-2 justify-center cursor-pointer',
              isLocked
                ? 'bg-grey-200 border-grey-600 items-center pt-0'
                : selectedSeats.includes(seatNumber)
                  ? 'bg-green-300 border-green-600'
                  : 'bg-gray-100',
            )}
          >
            {isLocked ? (
              <i className="fa fa-lock text-white"></i>
            ) : (
              <>
                <p
                  className={cn(
                    'text-sm select-none',
                    selectedSeats.includes(seatNumber) && 'text-white',
                  )}
                >
                  {seatNumber}
                </p>
                <div className="absolute bottom-1 border border-grey-900 w-4/5 rounded-md shadow-sm h-2"></div>
              </>
            )}
          </div>,
        );
      }
      rows.push(
        <div key={totalRows} className="flex gap-4  mb-2">
          {lastRow}
        </div>,
      );
    }

    return rows;
  };

  return (
    <div className="flex flex-col r  p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-between mb-6">
          <div className="w-full">
            <h2 className="font-bold mb-2">Chú thích</h2>
            <div className="flex items-center mb-2">
              <div className="relative  w-6 h-12 border rounded flex  justify-center cursor-pointe bg-grey-200 border-grey-200 items-center pt-0 mr-2">
                <i className="fa fa-lock text-white"></i>
              </div>
              <span>Ghế không bán</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="relative border-1 border-green-600 w-6 h-12 rounded flex pt-1 justify-center mr-2 cursor-pointer bg-green-300">
                <p className="text-white">n</p>
                <div className="absolute bottom-2 border border-green-600 w-4/5 rounded-md shadow-sm h-2"></div>
              </div>
              <span>Đang chọn</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="relative border-grey-600 w-6 h-12 border rounded flex pt-2 justify-center mr-2 cursor-pointer">
                n
                <div className="absolute bottom-1 border border-grey-900 w-4/5 rounded-md shadow-sm h-2"></div>
              </div>
              <span>Còn trống</span>
            </div>
          </div>

          {/* Sơ đồ tầng */}
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <h3 className="font-bold mb-2">
                {isDoubleDeck ? 'Tầng dưới' : 'Sơ đồ chỗ ngồi'}
              </h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center flex-start mb-4">
                  <SteeringWheelIcon />
                </div>
                {/* Render ghế với ghế tài xế ở vị trí (1, 1) */}
                <div className="flex flex-col">
                  {renderSeats(1, seatsPerFloor)} {/* Render ghế từ 2 trở đi */}
                </div>
              </div>
            </div>
            {isDoubleDeck && (
              <div className="flex flex-col items-center">
                <h3 className="font-bold mb-2">Tầng trên</h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center flex-start mb-4">
                    <SteeringWheelIcon />
                  </div>
                  {renderSeats(seatsPerFloor + 1, seatsPerFloor)}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-gray-500">
            Tổng cộng: {selectedSeats.length} ghế đã chọn
          </span>
          <div className="flex gap-2 items-center">
            <div className="text-lg items-center">
              {`Tổng cộng: `}
              <span className="text-blue-600 font-bold">
                {convertStringToNumber(price * selectedSeats.length)}
              </span>
            </div>
            {auth && (
              <Button
                isDisabled={selectedSeats.length === 0}
                onClick={confirmBooking}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Tiếp tục
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
