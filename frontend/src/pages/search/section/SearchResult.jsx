import SteeringWheelIcon from '@assets/base/icon/SteeringWheelIcon';
import ImageGallery from '@components/galery/Galery';
import Review from '@components/review';
import { Button, Chip, ScrollShadow, Tab, Tabs } from '@nextui-org/react';
import { imageBus, reviewsData, searchCar } from '@pages/detail/mock';
import { RouterPath } from '@router/RouterPath';
import { BUSES_LIST, FEATURE } from '@utils/constants';
import { cn, convertStringToNumber } from '@utils/Utils';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchResult() {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-bold text-2xl">Kết quả: 222 chuyến xe</p>
      <div className="flex flex-wrap gap-2 mb-2">
        <Chip color="success" className="text-white">
          12:00 - 24:00
        </Chip>
        <Chip color="success" className="text-white">
          Giá vé: 120.000 - 500000
        </Chip>
      </div>
      <div className="w-full flex flex-col gap-5">
        {searchCar?.map((x) => (
          <CardSearch item={x} />
        ))}
      </div>
    </div>
  );
}

function CardSearch({ item }) {
  const [showDetail, setShowDetail] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  return (
    <div className="w-full flex flex-col mx-auto p-4 bg-white border hover:shadow-xl rounded-lg">
      <div className="flex">
        <div className="relative">
          <img
            src={
              item.busImage ??
              'https://static.vexere.com/production/images/1716953194738.jpeg?w=250&h=250'
            }
            alt="Bus image"
            className="w-40 h-40 rounded-md"
          />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between ">
            <div>
              <h2 className="text-lg font-bold">{item.branchName}</h2>
              <div className="text-sm text-gray-500">
                {BUSES_LIST.find((x) => x.id === item.busId)?.name}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-blue-600 text-lg font-bold">
                Từ {item.price}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="bg-blue-500 text-white px-2 py-1 rounded-md">
                  {item.rating} ({item.ratingCount})
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-center text-gray-700">
              <i className="fas fa-map-marker-alt text-blue-500"></i>
              <span className="ml-2 font-bold text-lg">
                {item.departureTime}
              </span>
              <span className="ml-2">· {item.departureLocation}</span>
            </div>
            <div className="ml-6 text-gray-500">7h</div>
            <div className="flex items-center text-gray-700">
              <i className="fas fa-map-marker-alt text-red"></i>
              <span className="ml-2 font-bold text-lg">{item.arrivalTime}</span>
              <span className="ml-2">· {item.arrivalLocation}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-0 mb-2 w-full ">
        <div className="flex flex-col ">
          <div className="text-lg text-content font-bold">
            {item?.feature.includes('F1') && 'KHÔNG CẦN THANH TOÁN TRƯỚC'}
          </div>
          <div className="text-gray-500">
            Còn {item.availableSeats} chỗ trống
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
                <Tab key="policy" title="Chính sách">
                  <div className="w-full ">
                    {item.policy && <div>{item.policy}</div>}
                  </div>
                </Tab>
                <Tab
                  key="photos"
                  title="Hình ảnh"
                  className="flex items-center justify-center w-full"
                >
                  <div className="w-full flex justify-center items-center">
                    <div className="w-[600px]">
                      <ImageGallery images={imageBus} />
                    </div>
                  </div>
                </Tab>
                <Tab key="rate" title="Đánh giá">
                  <div className="">
                    <ScrollShadow className="w-full h-[400px]">
                      {reviewsData.map((review) => (
                        <Review key={review.id} review={review} />
                      ))}
                    </ScrollShadow>
                  </div>
                </Tab>

                <Tab key="feature" title="Tiện ích">
                  <div className="flex justify-start items-start flex-wrap gap-8 w-full  p-6 rounded-lg">
                    {FEATURE.map((x) => (
                      <div
                        key={x.id}
                        className="flex items-center min-w-[100px] gap-3"
                      >
                        <div className="bg-gray-100  w-8 h-8 flex items-center justify-center  rounded">
                          <i className={`${x.icon}`}></i>
                        </div>
                        <span className="text-black">{x.name}</span>
                      </div>
                    ))}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </>
      )}

      {showBooking && (
        <BookingSection
          busId={item.busId}
          seatsLocked={'1,19'}
          price={item.price}
        />
      )}
    </div>
  );
}

function BookingSection({ busId, seatsLocked, price }) {
  const navigator = useNavigate();
  const bus = BUSES_LIST.find((b) => b.id === busId);
  const [selectedSeats, setSelectedSeats] = useState([]);
  // Kiểm tra nếu xe trên 30 chỗ thì chia thành hai tầng
  const totalSeats = bus.seats;
  const isDoubleDeck = bus.levels === 2;
  const seatsPerRow = bus.seatsPerRow;
  const seatsPerFloor = isDoubleDeck ? Math.ceil(totalSeats / 2) : totalSeats;
  const rowsPerLevel = bus.rowsPerLevel; // Số hàng trên mỗi tầng

  // Hàm xử lý chọn ghế
  const toggleSeatSelection = (seatNumber) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatNumber)
        ? prevSelected.filter((seat) => seat !== seatNumber)
        : [...prevSelected, seatNumber],
    );
  };
  function confirmBooking() {
    navigator(RouterPath.CONFIRM_INFORMATION);
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

        const newSeatsLocked = seatsLocked.split(',');
        const isLocked = newSeatsLocked.includes(seatNumber.toString());
        seats.push(
          <div
            key={seatNumber}
            onClick={() => toggleSeatSelection(seatNumber)}
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

        const newSeatsLocked = seatsLocked.split(',');
        const isLocked = newSeatsLocked.includes(seatNumber.toString());
        lastRow.push(
          <div
            key={seatNumber}
            onClick={() => toggleSeatSelection(seatNumber)}
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
            <Button
              onClick={confirmBooking}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
