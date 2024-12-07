import GoogleMapLink from '@components/map/GoogleMapLink';
import { Chip } from '@nextui-org/react';
import { convertStringToNumber } from '@utils/Utils';

export default function TicketModal({ item }) {
  console.log('🚀 ~ TicketModal ~ item:', item);
  return (
    <div className="">
      <div className=" ">
        <div className="bg-blue-500 text-white text-center py-4">
          <h2 className="text-xl font-bold">
            NHÀ XE {item?.BranchName.toUpperCase()}
          </h2>
        </div>
        <div className="p-4">
          <div className="bg-yellow-400 p-4 rounded-md text-center">
            <div className="flex flex-row justify-between">
              <p className="font-bold">Tên xe:</p>
              <p className="">{item.BusName}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Tuyến đường:</p>
              <p className="">{item.Route}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Giờ khởi hành:</p>
              <p className="">{item.DepartureTime}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Giờ đến:</p>
              <p className="">{item.ArrivalTime}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Số lượng chỗ:</p>
              <p className="">{item.TicketCount}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Vị trí ghế:</p>
              <p className="">{item.Seats}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Tổng tiền thanh toán:</p>
              <p className="">{convertStringToNumber(item.price)}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Trạng thái:</p>
              <Chip color="success" className="text-white">
                {item.Status}
              </Chip>
            </div>
          </div>
        </div>
        <div className="flex justify-around bg-gray-100 p-4">
          <div className="text-center">
            <i className="fas fa-map-marker-alt text-blue-500 text-2xl"></i>
            <p className="mt-2">Điểm đón</p>
            <GoogleMapLink lat={item?.lat} lng={item?.lng} />
          </div>
          <div className="text-center">
            <i className="fas fa-phone-alt text-blue-500 text-2xl"></i>
            <p className="mt-2">Gọi điện</p>
            <Chip color="success" className="text-white">
              09213123123
            </Chip>
          </div>
        </div>
        <div className="bg-gray-100 p-4">
          <h2 className="font-bold">Hướng dẫn lên xe</h2>
          <p className="mt-2">
            Bạn cần ra điểm đón trước 15 phút, đưa SMS hoặc email xác nhận thanh
            toán của Vexere cho nhân viên văn phòng vé để đổi vé giấy
          </p>
          <p className="mt-2">
            Khi lên xe, bạn xuất trình vé cho tài xế hoặc phụ xe.
          </p>
        </div>
        <div className="p-4">
          {/* <Button
            onClick={() => navigator('/')}
            className="bg-blue-500 text-white w-full py-2 rounded-md"
          >
            <i className="fas fa-exchange-alt"></i> Thoats
          </Button> */}
        </div>
      </div>
    </div>
  );
}
