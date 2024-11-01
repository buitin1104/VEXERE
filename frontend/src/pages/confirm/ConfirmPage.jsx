import InputField from '@components/common/InputField';
import { Button, Radio, RadioGroup } from '@nextui-org/react';
import { RouterPath } from '@router/RouterPath';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function ConfirmPage() {
  const methods = useForm();
  const { register, errors } = methods;
  const navigator = useNavigate();
  function createTicker(params) {
    navigator(RouterPath.CREATED_SUCCESS);
  }
  function handleSave() {
    console.log('save');
  }
  return (
    <div className="mx-auto max-w-full px-5 lg:max-w-[70%] lg:px-0 2xl:max-w-[60%] flex  mt-6 gap-4 mb-20">
      <div className="w-2/3 flex flex-col gap-4">
        <div className="w-full border rounded-lg shadow-lg">
          <div className="p-5">
            <p className="text-xl font-bold">Thông tin liên hệ</p>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSave)}>
                <div className="flex flex-col gap-5 mt-3">
                  <InputField
                    placeholder="Nhập họ và tên"
                    label="Tên người đi"
                    name={'full_name'}
                    isRequired
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    placeholder="Nhập số điện thoại "
                    label="Số điện thoại"
                    name={'phone'}
                    isRequired
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    placeholder="Nhập email"
                    label="Email nhận thông tin"
                    name={'email'}
                    type="email"
                    isRequired
                    register={register}
                    errors={errors}
                  />
                  <div className="py-2 px-3 rounded-lg text-sm  bg-green-100 border border-green-460 text-content-primaryC flex  items-center gap-2">
                    <i className="fa fa-check-circle text-white bg-green-500 rounded-full p-1"></i>
                    <p>
                      Số điện thoại và email được sử dụng để gửi thông tin đơn
                      hàng và liên hệ khi cần thiết.
                    </p>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
        <div className="w-full border rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Thông tin chuyến đi</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <i className="fas fa-bus text-blue-500 mr-2"></i>
              <span className="text-sm">T5, 31/10/2024</span>
              <i className="fas fa-user-friends text-gray-500 ml-4 mr-2"></i>
              <span className="text-sm">2</span>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <img
              src="https://placehold.co/60x60"
              alt="Bus image"
              className="w-16 h-16 rounded mr-4"
            />
            <div>
              <h3 className="font-semibold">Tuấn Tú Express</h3>
              <p className="text-sm text-gray-500">Luxury 34 phòng</p>
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="relative flex items-center mb-4">
            <div className="absolute top-8 left-[13.6%] bg-gray-300 h-[48px] w-[2px]"></div>
            <div className="text-center mr-5">
              <p className="text-2xl font-semibold">17:01</p>
              <p className="text-sm text-gray-500">(31/10)</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                <div>
                  <p className="font-semibold">590 Bình Long</p>
                  <p className="text-sm text-gray-500">
                    590 Bình Long, Phường Tân Quý, Tân Phú, Hồ Chí Minh
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-center mr-[15px]">
              <p className="text-2xl font-semibold">02:01</p>
              <p className="text-sm text-gray-500">(01/11)</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <i className="fas fa-map-marker-alt text-red mr-2"></i>
                <div>
                  <p className="font-semibold">Khánh Hòa</p>
                  <p className="text-sm text-gray-500">
                    Quốc lộ 1A, Xã Vĩnh Trung, Nha Trang, Khánh Hòa
                  </p>
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
                300.000đ x 5
              </span>
              <span className="text-[10px] font-sans">
                Mã ghế/giường: 1,2,3,5
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold ">Tạm tính</span>
            <span className="text-lg font-bold">900.000đ</span>
          </div>
        </div>

        {/* // thanh toán */}
        <div className=" px-4 w-full border rounded-lg shadow-lg p-6 ">
          <p className="text-lg mb-2 font-bold">Phương thức thanh toán</p>
          <RadioGroup>
            <Radio value="buenos-aires">Thanh toán khi lên xe</Radio>
            <Radio value="sydney">Thanh toán qua VNPAY</Radio>
            <Radio value="san-francisco">Thanh toán qua MoMo</Radio>
            <Radio value="london">Thanh toán bằng thẻ tín dụng</Radio>
          </RadioGroup>
        </div>

        <Button
          color="primary"
          onClick={createTicker}
          className="w-full mt-4"
          variant="shadow"
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
}
