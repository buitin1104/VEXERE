import TextAreaField from '@components/common/TextAreaField';
import GoogleMapLink from '@components/map/GoogleMapLink';
import { Button, Chip } from '@nextui-org/react';
import { BUSES_LIST, PROVINCES, TICKET_STATUS } from '@utils/constants';
import {
  convertStringToNumber,
  getDate,
  ToastInfo,
  ToastNotiError,
} from '@utils/Utils';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory';

const maxStars = 5;
export default function TicketModal({ item, onReload }) {
  const methods = useForm();
  const [rating, setRating] = useState(item.rating);
  const [hover, setHover] = useState(0);
  const { onClose } = useModalCommon();
  const { auth } = useAuth();
  const isOwner = useMemo(() => auth?._id === item.userId._id, [item]);
  useEffect(() => {
    if (item.star) {
      setRating(Number(item.star));
      methods.setValue('content', item.review);
    }
  }, [item?.star]);
  const onSubmit = () => {
    const values = methods.watch();
    factories
      .createReview({
        review: values.content,
        star: rating,
        id: item._id,
      })
      .then((data) => {
        if (data._id) {
          ToastInfo('Cảm ơn bạn đã đánh giá dịch vụ của chúng tôi');
          onReload();
          onClose();
        }
      })
      .catch((err) => {
        ToastNotiError(err.response.data.message);
      });
  };
  return (
    <div className="">
      <div className=" ">
        <div className="bg-blue-500 text-white text-center py-4">
          <h2 className="text-xl font-bold">
            {
              BUSES_LIST.find((x) => x.id.toString() === item.bus.busModel)
                ?.label
            }
          </h2>
        </div>
        <div className="p-4">
          <div className="bg-yellow-400 p-2 rounded-md text-center">
            <div className="flex flex-row justify-between">
              <p className="font-bold">Tuyến đường:</p>
              <div className="flex justify-end gap-2">
                <p className="flex flex-row justify-end">
                  {
                    PROVINCES.find((x) => x.value === item.tripId.origin.city)
                      ?.label
                  }
                </p>
                <p>-</p>
                <p>
                  {
                    PROVINCES.find(
                      (x) => x.value === item.tripId.destination.city,
                    )?.label
                  }
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Giờ khởi hành:</p>
              <p className="">{getDate(item.tripId.departureTime, 6)}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Giờ đến:</p>
              <p className="">{getDate(item.tripId.arrivalTime, 6)}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Số lượng chỗ:</p>
              <p className="">{item.seats.length}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Vị trí ghế:</p>
              <p className="">{item.seats.join(',')}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Tổng tiền thanh toán:</p>
              <p className="">{convertStringToNumber(item.price)}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Trạng thái:</p>
              <Chip
                color={
                  TICKET_STATUS.find((x) => x.value === item.status)?.color
                }
                className="text-white"
              >
                {TICKET_STATUS.find((x) => x.value === item.status)?.label}
              </Chip>
            </div>
          </div>
        </div>
        <div className="flex justify-around bg-gray-100 p-1  rounded-t-lg">
          <div className="text-center">
            <i className="fas fa-map-marker-alt text-blue-500 text-2xl"></i>
            <p className="mt-2">Điểm đón</p>
            <GoogleMapLink
              lat={item?.tripId.origin.coordinates?.[0]}
              lng={item?.tripId.origin.coordinates?.[1]}
            />
          </div>
          {item.driverId?.phone && (
            <div className="text-center">
              <i className="fas fa-phone-alt text-blue-500 text-2xl"></i>
              <p className="mt-2">Gọi điện</p>
              <Chip color="success" className="text-white rounded-md">
                {item.driverId.phone}
              </Chip>
            </div>
          )}
        </div>
        <div className="bg-gray-100 p-3 rounded-b-lg">
          <h2 className="font-bold">Hướng dẫn lên xe</h2>
          <p className="mt-1">
            Bạn cần ra điểm đón trước 15 phút, đọc SĐT cho nhân viên để nhân
            viên văn phòng vé để đổi vé giấy.
          </p>
          <p className="mt-2">
            Khi lên xe, bạn xuất trình vé cho tài xế hoặc phụ xe.
          </p>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="my-2 bg-neutral-100 p-2 rounded-xl">
              <div className="flex space-x-1 w-full justify-center mb-1">
                {Array.from({ length: maxStars }, (_, index) => {
                  const starValue = index + 1;
                  return (
                    <i
                      key={index}
                      className={`fa fa-star text-2xl cursor-pointer transition-colors ${
                        starValue <= (hover || rating)
                          ? 'text-yellow-400'
                          : 'text-gray-400'
                      }`}
                      onClick={() => isOwner && setRating(starValue)}
                      onMouseEnter={() => isOwner && setHover(starValue)}
                      onMouseLeave={() => isOwner && setHover(0)}
                    ></i>
                  );
                })}
              </div>
            </div>

            <TextAreaField
              label="Đánh giá"
              name={'content'}
              isDisabled={!isOwner}
            />
            {isOwner && item.status === 1 && (
              <div className="flex justify-end  w-full">
                <Button
                  type="submit"
                  className="mt-4 text-white"
                  color="secondary"
                >
                  Gửi đánh giá
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
