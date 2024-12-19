import GoogleMapLink from '@components/map/GoogleMapLink';
import { Button, Chip } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRouter from '../../hook/use-router';

export default function CreatedSuccessPage() {
  const navigator = useNavigate();
  const router = useRouter();
  const params = router.getAll();
  const data = JSON.parse(decodeURIComponent(params.item));
  console.log('🚀 ~ CreatedSuccessPage ~ data:', data);
  return (
    <div className="mx-auto max-w-full px-5 lg:max-w-[70%] lg:px-0 2xl:max-w-[60%] flex  mt-6 gap-4 mb-20">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10">
        <div className="bg-blue-500 text-white text-center py-4">
          <h1 className="text-xl font-bold">Đặt chỗ thành công</h1>
        </div>
        <div className="p-4">
          <div className="bg-yellow-400 p-4 rounded-md text-center">
            <p className="text-black font-bold">
              Vé của bạn đã được đặt thành công
              {/* <span className="text-red-600">19:47</span> ngày{' '}
              <span className="text-red-600">19/02/2021</span>. Vui lòng thanh */}
              {/* toán trước thời điểm này, nếu không vé của bạn sẽ bị hủy. */}
            </p>
          </div>
          {/* <p className="mt-4 text-center">
            Chúng tôi đã gửi thông tin vé đến SĐT{' '}
            <span className="font-bold">0901234567</span> và email{' '}
            <span className="font-bold">Nguyenvana@gmail.com</span>, bạn hãy
            kiểm tra thật kĩ nhé!
          </p> */}
        </div>
        <div className="flex justify-around bg-gray-100 p-4">
          <div className="text-center">
            <i className="fas fa-map-marker-alt text-blue-500 text-2xl"></i>
            <p className="mt-2">Điểm đón</p>
            {data?.origin?.coordinates?.[0] && (
              <GoogleMapLink
                lat={data?.origin?.coordinates?.[0]}
                lng={data?.origin?.coordinates?.[1]}
              />
            )}
          </div>
          <div className="text-center">
            <i className="fas fa-phone-alt text-blue-500 text-2xl"></i>
            <p className="mt-2">Gọi điện</p>
            <Chip color="success" className="text-white">
              {data?.driverId?.phone}
            </Chip>
          </div>
        </div>
        <div className="bg-gray-100 p-4">
          <h2 className="font-bold">Hướng dẫn lên xe</h2>
          <p className="mt-2">
            Bạn cần ra điểm đón trước 15 phút, đưa mã vé cho nhân viên của
            Vexere cho nhân viên văn phòng vé để đổi vé giấy
          </p>
          <p className="mt-2">
            Khi lên xe, bạn xuất trình vé giấy cho tài xế hoặc phụ xe.
          </p>
        </div>
        <div className="p-4">
          <Button
            onClick={() => navigator('/')}
            className="bg-blue-500 text-white w-full py-2 rounded-md"
          >
            <i className="fas fa-exchange-alt"></i>Quay lại trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
