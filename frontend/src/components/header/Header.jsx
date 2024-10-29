import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { parseZonedDateTime } from '@internationalized/date';
import {
  Button,
  DateRangePicker,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Switch,
} from '@nextui-org/react';
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
    <div className="relative rounded-ee-xl rounded-es-xl bg-blue-600">
      <div className="m-auto w-full max-w-[80%] 2xl:max-w-[80%]">
        <header className="pt-5 text-white">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold">
                VEXERE
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

        <main className={cn('text-left text-white', !showText && 'py-7')}>
          {showText && (
            <>
              <h1 className="pb-2 pt-8 text-4xl font-bold">
                Tìm chỗ nghỉ tiếp theo
              </h1>
              <p className="mt-2 pb-16 text-lg">
                Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...
              </p>
            </>
          )}

          {showSearch && (
            <div className="bottom-[-20px] w-full xl:absolute xl:w-[80%] 2xl:w-[80%]">
              <div className="bg-ye flex w-full flex-col items-center justify-center gap-1 rounded-xl bg-accent p-1 shadow-lg xl:flex-row">
                <Select
                  className="flex-4 xl:flex-3 border-none"
                  variant="flat"
                  radius="sm"
                  defaultSelectedKeys={[1]}
                  placeholder="Bạn muốn đến đâu?"
                  startContent={<i className="fas fa-bed text-gray-500"></i>}
                >
                  <SelectItem key={1}>{'Hội An'}</SelectItem>
                  <SelectItem key={2}>{'Đà Nẵng'}</SelectItem>
                  <SelectItem key={3}>{'Đà Lạt'}</SelectItem>
                </Select>

                <DateRangePicker
                  radius="sm"
                  hideTimeZone
                  variant="flat"
                  visibleMonths={2}
                  className="flex-5 border-none"
                  defaultValue={{
                    start: parseZonedDateTime(
                      '2024-04-01T00:45[America/Los_Angeles]',
                    ),
                    end: parseZonedDateTime(
                      '2024-04-08T11:15[America/Los_Angeles]',
                    ),
                  }}
                />

                <Popover placement="bottom" offset={10}>
                  <PopoverTrigger>
                    <Button
                      className={cn(
                        'flex-3 w-full rounded-lg border-none bg-white xl:min-w-[250px]',
                        havePet && 'min-w-[300px]',
                      )}
                    >
                      Phòng {personCount} người · {roomCount} phòng{' '}
                      {havePet && '· Vật nuôi'}
                      <i
                        className="fa fa-caret-down tet-xl text-[20px] text-grey-500"
                        aria-hidden="true"
                      ></i>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex w-[250px] flex-col gap-2 p-4">
                      <div className="flex w-full">
                        <div className="flex w-full items-center justify-between gap-20">
                          <p className="text-small font-bold">Người lớn</p>
                        </div>
                        <NumberInput
                          minWidth={'100px'}
                          onChange={(e) => setPersonCount(e)}
                          value={personCount}
                          max={1000}
                          min={1}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </div>

                      <div className="flex w-full">
                        <div className="flex w-full items-center justify-between gap-20">
                          <p className="text-small font-bold">Số phòng</p>
                        </div>
                        <NumberInput
                          minWidth={'100px'}
                          onChange={(e) => setRoomCount(e)}
                          value={roomCount}
                          max={1000}
                          min={1}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </div>

                      <Divider />

                      <div className="flex w-full">
                        <div className="flex w-full items-center justify-between gap-20">
                          <p className="text-small font-bold">Vật nuôi</p>
                        </div>
                        <Switch
                          isSelected={havePet}
                          onChange={() => setHavePet(!havePet)}
                          color={'blue-base'}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  onClick={handleSearch}
                  variant="solid"
                  radius="sm"
                  className="w-full min-w-[200px] bg-blue-600 px-4 py-2 text-white xl:w-fit"
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Header;
