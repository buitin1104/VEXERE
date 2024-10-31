import {
  Button,
  DatePicker,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from '@nextui-org/react';

import { getLocalTimeZone, now } from '@internationalized/date';
import { RouterPath } from '@router/RouterPath';
import { cn } from '@utils/Utils';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useModalCommon } from '../../context/ModalContext';
import LoginModal from './Login';
import RegisterModal from './Register';

function Header({ showText, showSearch }) {
  const navigate = useNavigate();
  const { onOpen } = useModalCommon();
  const [roomCount, setRoomCount] = useState(1);
  const [personCount, setPersonCount] = useState(2);
  const [havePet, setHavePet] = useState(false);

  function handleSearch() {
    navigate('/search');
  }

  const openLogin = () => {
    onOpen({
      view: <LoginModal />,
      title: 'Đăng nhập',
      showFooter: false,
    });
  };

  function openRegister() {
    onOpen({
      view: <RegisterModal />,
      title: 'Đăng ký',
      showFooter: false,
    });
  }

  return (
    <div className="relative bg-blue-600">
      <div className="w-full justify-center items-center flex flex-col">
        <header className="py-3 text-white w-full  justify-center items-center">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-2xl font-bold">
                <img src="https://storage.googleapis.com/fe-production/svgIcon/icon_vxr_full_2.svg" />
                {/* VEXERE */}
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="light"
                color="white"
                className="rounded-xl font-bold hover:bg-blue-600"
                onClick={() => navigate(RouterPath.REGISTER_HOST)}
              >
                Trở thành đối tác
              </Button>

              <Popover placement="bottom" offset={10}>
                <PopoverTrigger>
                  <Button
                    variant="light"
                    color="white"
                    className="rounded-xl font-bold hover:bg-blue-600"
                  >
                    Hotline 24/7
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2 p-4">
                    <div classNam="flex flex-col w-full items-center justify-between gap-20">
                      <div>
                        <a href="tel:1900545541">
                          <span>1900545541 - </span>
                        </a>
                        Để đặt dịch vụ thuê xe (Từ 07:00 - 21:00)
                      </div>
                      <div>
                        <a href="tel:1900888684">
                          <span>1900888684 - </span>
                        </a>
                        Để đặt vé qua điện thoại (24/7)
                      </div>
                      <div>
                        <a href="tel:1900969681">
                          <span>1900969681 - </span>
                        </a>
                        Để phản hồi về dịch vụ và xử lý sự cố
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="bordered"
                color="primary"
                className="rounded-xl bg-slate-50 font-bold"
                onClick={openRegister}
              >
                Đăng ký
              </Button>
              <Button
                variant="bordered"
                color="primary"
                className="rounded-xl bg-slate-50 font-bold"
                onClick={openLogin}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </header>

        <main
          className={cn('w-full text-left text-white')}
          style={
            showText
              ? {
                  backgroundImage:
                    'url("https://static.vexere.com/production/banners/1209/leaderboard.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '456px',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }
              : {}
          }
        >
          {showText && (
            <div className="items-center flex flex-col justify-center mt-20">
              <h1 className="pb-2 pt-8 text-2xl font-bold">
                Tìm chuyến xe phù hợp với bạn, cam kết hoàn tiền nếu nhà xe
                không phục vụ
              </h1>
            </div>
          )}

          {showSearch && (
            <div className="items-center flex flex-col justify-center my-10 ">
              <div className=" w-full xl:w-[70%] flex h-full flex-col items-center justify-center gap-1 rounded-xl bg-white p-1 shadow-lg xl:flex-row">
                <Select
                  className="flex-4 xl:flex-3 border-nonet"
                  //   style={{
                  //     backgroundColor: 'transparent',
                  //   }}
                  variant="flat"
                  radius="sm"
                  label="Nơi xuất phát"
                  defaultSelectedKeys={[1]}
                  placeholder="Bạn muốn đến đâu?"
                  startContent={
                    <i className="fas fa-dot-circle text-blue-500"></i>
                  }
                >
                  <SelectItem key={1}>{'Hội An'}</SelectItem>
                  <SelectItem key={2}>{'Đà Nẵng'}</SelectItem>
                  <SelectItem key={3}>{'Đà Lạt'}</SelectItem>
                </Select>

                <div className=" flex flex-col h-full rounded-full p-2 bg-gray-200 border-blue-500 justify-center items-center ">
                  <i className="fas fa-exchange-alt text-gray-400"></i>
                </div>

                <Select
                  className="flex-4 xl:flex-3 border-none"
                  //   style={{
                  //     backgroundColor: 'transparent',
                  //   }}
                  variant="flat"
                  radius="sm"
                  label="Nơi đến"
                  defaultSelectedKeys={[1]}
                  placeholder="Bạn muốn đến đâu?"
                  startContent={
                    <i className="fas fa-map-marker-alt text-error"></i>
                  }
                >
                  <SelectItem key={1}>{'Hội An'}</SelectItem>
                  <SelectItem key={2}>{'Đà Nẵng'}</SelectItem>
                  <SelectItem key={3}>{'Đà Lạt'}</SelectItem>
                </Select>

                <div className="flex flex-col h-full rounded-full p-2 mx-0 justify-center items-center ">
                  {/* <i className="fas fa-exchange-alt text-gray-400"></i> */}
                </div>
                <DatePicker
                  label="Ngày đi"
                  radius="sm"
                  classNames={{
                    base: 'bg-white',
                    selectorButton: 'bg-white',
                    inputWrapper: 'bg-transparent',
                    input: 'bg-white',
                    // input,
                  }}
                  hideTimeZone
                  showMonthAndYearPickers
                  className="bg-white"
                  defaultValue={now(getLocalTimeZone())}
                />
                <div className="flex flex-col h-full rounded-full p-2 mx-0 justify-center items-center "></div>
                <Button
                  onClick={handleSearch}
                  variant="solid"
                  radius="sm"
                  className="w-full text-white min-w-[200px] bg-yellow-300   px-4 py-2 text-xl xl:w-fit h-14"
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          )}

          {showSearch && (
            <div className="h-14 w-full absolute bottom-0 bg-black bg-opacity-50 flex justify-center items-center space-x-12 text-white text-lg">
              <div className="flex items-center space-x-2">
                <i className="fas fa-star text-yellow-500"></i>
                <span>Chắc chắn có chỗ</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-headset text-yellow-500"></i>
                <span>Hỗ trợ 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-percent text-yellow-500"></i>
                <span>Nhiều ưu đãi</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-dollar-sign text-yellow-500"></i>
                <span>Thanh toán đa dạng</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Header;
