import InputField from '@components/conmon/InputField';
import TextAreaField from '@components/conmon/TextAreaField';
import { Button } from '@nextui-org/react';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterHostPage() {
  const registerRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  console.log('🚀 ~ RegisterHostPage ~ watch:', watch());

  function scrollToRegister() {
    if (registerRef.current) {
      registerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="translate-y-[-20px] mx-auto bg-blue-500">
      <div className=" text-white text-center py-16">
        <h1 className="text-4xl font-bold mb-4">
          Hệ thống quản lý bán vé Vexere
        </h1>
        <p className="text-xl mb-4">
          Giúp tăng <span className="font-bold">30% doanh thu</span> và giảm{' '}
          <span className="font-bold">20% chi phí</span>, được{' '}
          <span className="font-bold">&gt;80%</span> thị phần nhà xe có sử dụng
          phần mềm tin dùng.
        </p>
        <p className="mb-8">
          Vexere là chuyên gia trong lĩnh vực ứng dụng công nghệ, giúp nhà xe
          bán vé hiệu quả, phát triển thương hiệu và quản lý toàn diện.
        </p>
        <Button
          onClick={scrollToRegister}
          className="bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded"
        >
          Đăng kí trở thành đối tác ngay
        </Button>
      </div>

      <div className="bg-blue-500 text-white flex justify-center pb-14">
        <div className="flex flex-wrap justify-center items-center max-w-6xl">
          <div className="flex flex-col items-center m-2  w-72">
            <div className="bg-yellow-500 rounded-full  flex w-14 h-14 items-center justify-center mb-2">
              <i className="fas fa-laptop text-2xl"></i>
            </div>
            <p className="text-center">Phần mềm / Ứng dụng quản lý bán vé</p>
          </div>
          <div className="flex flex-col items-center m-2  w-72">
            <div className="bg-yellow-500 rounded-full  flex w-14 h-14 items-center justify-center  mb-2">
              <i className="fas fa-users text-2xl"></i>
            </div>
            <p className="text-center">Phần mềm quản lý đại lý bán vé</p>
          </div>
          <div className="flex flex-col items-center m-2  w-72">
            <div className="bg-yellow-500 rounded-full  flex w-14 h-14 items-center justify-center mb-2">
              <i className="fas fa-envelope text-2xl"></i>
            </div>
            <p className="text-center">Tin nhắn SMS / ZNS thương hiệu nhà xe</p>
          </div>
          <div className="flex flex-col items-center m-2  w-72">
            <div className="bg-yellow-500 rounded-full  flex w-14 h-14 items-center justify-center mb-2">
              <i className="fas fa-globe text-2xl"></i>
            </div>
            <p className="text-center">Website / App thương hiệu nhà xe</p>
          </div>
          <div className="flex flex-col items-center m-2  w-72">
            <div className="bg-yellow-500 rounded-full  flex w-14 h-14 items-center justify-center mb-2 ">
              <i className="fas fa-phone text-2xl"></i>
            </div>
            <p className="text-center">Tổng đài bán vé</p>
          </div>
          <div className="flex flex-col items-center m-2 w-72 mt-5">
            <div className="bg-yellow-500 rounded-full flex w-14 h-14 items-center justify-center">
              <i className="fas fa-file-alt text-2xl "></i>
            </div>
            <p className="text-center">
              Vé / Hóa đơn / Hợp đồng / Lệnh vận chuyển điện tử
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 text-blue-900 text-center py-28 px-10">
        <h2 className="text-2xl font-bold mb-8">
          Phần mềm nhà xe Vexere được tin tưởng và đánh giá cao bởi
        </h2>
        <div className="flex justify-center space-x-16">
          <div>
            <p className="text-3xl font-bold">&gt;80%</p>
            <p>
              Thị phần nhà xe lớn có sử dụng phần mềm quản lý bán vé ở Việt Nam
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">700+</p>
            <p>Nhà xe trên toàn quốc</p>
          </div>
          <div>
            <p className="text-3xl font-bold">1100+</p>
            <p>Văn phòng bán vé</p>
          </div>
          <div>
            <p className="text-3xl font-bold">7200+</p>
            <p>Nhân viên bán vé và tài xế</p>
          </div>
          <div>
            <p className="text-3xl font-bold">10 triệu+</p>
            <p>Lượt khách đặt vé thành công qua sàn Vexere</p>
          </div>
        </div>
      </div>

      <div
        className="flex py-20 mx-auto w-[80%] justify-center"
        ref={registerRef}
      >
        <div className="flex flex-col w-full justify-center items-center">
          <p className="font-bold text-xl w-full text-center text-white">
            Cùng 700+ nhà xe dùng thử miễn phí phần mềm quản lý xe khách Vexere
          </p>

          <div className="mt-10 px-6 py-8 rounded-lg gap-8 bg-white flex flex-col shadow-lg max-w-2xl">
            <p className="w-full font-bold text-center text-2xl">
              Đăng ký thông tin ngay
            </p>
            <div className="flex gap-8">
              <InputField
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                name={'fullName'}
                register={register}
                isRequired
                errors={errors}
              />
              <InputField
                placeholder="Nhập số điện thoại"
                label="Số điện thoại"
                name={'phone'}
                isRequired
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex gap-8">
              <InputField
                placeholder="Nhập email"
                label="Email"
                isRequired
                name={'email'}
                register={register}
                errors={errors}
              />
              <InputField
                placeholder="Nhập tên hãng xe"
                label="Tên hãng xe"
                name={'name'}
                isRequired
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex gap-8 w-full">
              <TextAreaField
                label={'Thông tin liên hệ'}
                register={register}
                errors={errors}
                name={'information'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
