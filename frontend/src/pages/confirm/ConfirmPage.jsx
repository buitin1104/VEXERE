import InputField from '@components/common/InputField';
import { Button, Radio, RadioGroup } from '@nextui-org/react';
import { RouterPath } from '@router/RouterPath';
import {
  BUSES_LIST,
  PAYMENT_METHODS,
  PROVINCES,
  WEEKDAYS,
} from '@utils/constants';
import {
  convertStringToNumber,
  getDate,
  ToastInfo,
  ToastNotiError,
} from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { factories } from '../../factory';
import useRouter from '../../hook/use-router';

export default function ConfirmPage() {
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  const { setValue } = methods;
  const { auth } = useAuth();
  const router = useRouter();
  const params = router.getAll();
  const data = JSON.parse(decodeURIComponent(params.item));

  function handleSave(values) {
    setLoading(true);
    const newTicket = {
      userId: auth._id,
      name: values.fullName,
      phone: values.phone,
      email: values?.email,
      seats: data.seats,
      bus: data.bus,
      driverId: data.driverId,
      status: 1,
      tripId: data._id,
      price: data.price,
      paymentMethod: values.payment ?? 1,
    };
    factories
      .addMoneyToWallet(newTicket)
      .then(() => {
        setLoading(false);
        ToastInfo('Đặt vé thành công');
        const encodedItem = encodeURIComponent(JSON.stringify(data));
        router.push({
          pathname: RouterPath.CREATED_SUCCESS,
          params: {
            item: encodedItem,
          },
        });
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          ToastNotiError(err.response?.data?.message);
        }
        setLoading(false);
      });
  }
  useEffect(() => {
    if (auth) {
      setValue('fullName', auth.fullName);
      setValue('phone', auth.phone);
      setValue('email', auth.email);
    }
  }, [auth]);
  return (
    <div className="mx-auto max-w-full px-5 lg:max-w-[70%] lg:px-0 2xl:max-w-[60%] flex  mt-6 gap-4 mb-20">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSave)}>
          <div className="flex flex-row justify-between gap-10">
            <div className="w-2/3 flex flex-col gap-4">
              <div className="w-full border rounded-lg shadow-lg">
                <div className="p-5">
                  <p className="text-xl font-bold">Thông tin liên hệ</p>
                  <div className="flex flex-col gap-5 mt-3">
                    <InputField
                      placeholder="Nhập họ và tên"
                      label="Tên người đi"
                      name={'fullName'}
                      isRequired
                      validate={{ required: 'Bắt buộc chọn' }}
                    />
                    <InputField
                      placeholder="Nhập số điện thoại "
                      label="Số điện thoại"
                      name={'phone'}
                      isRequired
                      validate={{ required: 'Bắt buộc chọn' }}
                    />
                    <InputField
                      placeholder="Nhập email"
                      label="Email liên hệ"
                      name={'email'}
                      type="email"
                      isDisabled
                    />
                    <div className="py-2 px-3 rounded-lg text-sm  bg-green-100 border border-green-460 text-content-primaryC flex  items-center gap-2">
                      <i className="fa fa-check-circle text-white bg-green-500 rounded-full p-1"></i>
                      <p>
                        Số điện thoại và email được sử dụng để gửi thông tin đơn
                        hàng và liên hệ khi cần thiết.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full border rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Thông tin chuyến đi
                </h2>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <i className="fas fa-bus text-blue-500 mr-2"></i>
                    <span className="text-sm">
                      {WEEKDAYS[new Date(data.departureTime).getDay()]},{' '}
                      {getDate(data.departureTime, 3)}
                    </span>
                    <i className="fas fa-user-friends text-gray-500 ml-4 mr-2"></i>
                    <span className="text-sm">{data?.seats.length}</span>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <img
                    src={
                      data.bus.gallery[0] ??
                      'https://static.vexere.com/production/images/1716953194738.jpeg?w=250&h=250'
                    }
                    alt="Bus image"
                    className="w-16 h-16 rounded mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {
                        PROVINCES.find((x) => x.value === data.origin.city)
                          ?.label
                      }
                      {` - `}
                      {
                        PROVINCES.find((x) => x.value === data.destination.city)
                          ?.label
                      }
                    </h3>
                    <p className="text-sm text-gray-500">
                      {
                        BUSES_LIST.find(
                          (x) => x.id.toString() === data.bus.busModel,
                        )?.label
                      }
                    </p>
                  </div>
                </div>
                <hr className="my-4 border-gray-300" />
                <div className="flex flex-row gap-4">
                  <div className="flex justify-start items-start flex-col gap-2">
                    <div className="text-center mr-5">
                      <p className="text-2xl font-semibold">
                        {getDate(data.departureTime, 6)}
                      </p>
                      <p className="text-sm text-gray-500">
                        ({getDate(data.departureTime, 11)})
                      </p>
                    </div>
                    <div className="text-center mr-[15px]">
                      <p className="text-2xl font-semibold">
                        {' '}
                        {getDate(data.arrivalTime, 6)}
                      </p>
                      ({getDate(data.arrivalTime, 11)})
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-start ">
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                      <div>
                        <p className="font-semibold">{data.origin.name}</p>
                      </div>
                    </div>
                    <div className="w-0.5 bg-gray-200 h-10 ml-1 flex-shrink-1"></div>
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt text-red mr-2"></i>
                      <div>
                        <p className="font-semibold">{data.destination.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className=" px-4 w-full border rounded-lg shadow-lg p-6 mb-5">
                <div className="flex justify-between  mb-4 ">
                  <span className="text-lg font-semibold">Giá vé</span>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-sans font-semibold ">
                      {data.seats.length} x {convertStringToNumber(data.price)}
                    </span>
                    <span className="text-[10px] font-sans">
                      Mã ghế/giường: {data.seats.join(',')}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold ">Tổng tiền:</span>
                  <span className="text-lg font-bold">
                    {convertStringToNumber(data.seats.length * data.price)}
                  </span>
                </div>
              </div>

              {/* // thanh toán */}
              <div className=" px-4 w-full border rounded-lg shadow-lg p-6 ">
                <p className="text-lg mb-2 font-bold">Phương thức thanh toán</p>
                <RadioGroup
                  isDisabled
                  defaultValue={'2'}
                  onChange={(e) => {
                    setValue('payment', e);
                  }}
                >
                  {PAYMENT_METHODS.map((x) => (
                    <Radio key={x.id} value={x.id}>
                      {x.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>

              <Button
                color="primary"
                type="submit"
                className="w-full mt-4"
                variant="shadow"
                isLoading={loading}
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
