import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, DatePicker, Select, SelectItem } from '@nextui-org/react';
import { BUSES_LIST, PROVINCES, ROLES } from '@utils/constants';
import { convertStringToNumber, getDate, ToastInfo } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory/index';
import CreateBusDestinationModal from './modal/CreateBusDestination';
import CreateBusTripModal from './modal/CreateBusTripModal';

export default function AdminBusRoute({ isAdmin }) {
  //   const [keyword, setKeyword] = useState();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState();
  const { auth } = useAuth();
  const [date, setDate] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const [loading, setLoading] = useState(true);
  const { onOpen } = useModalCommon();
  useEffect(() => {
    loadList();
  }, [pagination?.current]);

  function createBusTrip() {
    onOpen({
      view: <CreateBusTripModal onReload={loadList} />,
      title: 'Tạo chuyến xe mới',
      size: '4xl',
    });
  }
  function editBusTripStatus(row) {
    factories
      .editBusTrip(row._id)
      .then(() => {
        ToastInfo('Cập nhật thông tin thành công');
        loadList();
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          ToastNotiError(err.response?.data?.message);
        }
      });
  }
  function createBusDestination() {
    onOpen({
      view: <CreateBusDestinationModal onReload={loadList} />,
      title: 'Tạo điểm đón / trả',
      size: 'xl',
    });
  }
  function loadList() {
    setLoading(true);
    const params = {
      //   page: pagination?.current || 1,
      fromCity: from,
      toCity: to,
      departureDateTime: getDate(date, 17),
      ...(auth.roles[0] === ROLES.BUS_OWNER ? { ownerId: auth._id } : {}),
    };
    factories
      .getListBusesTrip(params)
      .then((data) => {
        if (data) setData(data?.busTrips);
        setLoading(false);
        // setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }

  const columns = [
    {
      id: 'BusName',
      label: 'Biển số xe',
      renderCell: (row) => <div className="w-22">{row?.bus?.busNumber}</div>,
    },
    {
      id: 'BranchName',
      label: 'Mẫu xe',
      renderCell: (row) => (
        <div className="w-32">
          {
            BUSES_LIST.find((x) => x.id.toString() === row?.bus?.busModel)
              ?.label
          }
        </div>
      ),
    },
    {
      id: 'seats',
      label: 'Số ghế',
      renderCell: (row) => (
        <div className="w-12">
          {
            BUSES_LIST.find((x) => x.id.toString() === row?.bus?.busModel)
              ?.seats
          }
        </div>
      ),
    },
    {
      id: 'driver2',
      label: 'Tài xế',
      renderCell: (row) => <span>{row.driverId?.fullName}</span>,
    },
    {
      id: 'from',
      label: 'Lộ trình',
      renderCell: (row) => (
        <div className="w-42">
          {row?.origin?.name} - {row?.destination?.name}
        </div>
      ),
    },
    {
      id: 'time',
      label: 'Xuất phát',
      renderCell: (row) => (
        <div className="w-28">{getDate(row.departureTime, 7)}</div>
      ),
    },
    {
      id: 'timeTo',
      label: 'Đến nơi',
      renderCell: (row) => (
        <div className="w-28">{getDate(row.arrivalTime, 7)}</div>
      ),
    },
    {
      id: 'prive',
      label: 'Giá vé',
      renderCell: (row) => (
        <div className="w-28">{convertStringToNumber(row.price)}</div>
      ),
    },
    {
      id: 'action',
      label: 'Tác vụ',
      headCell: () => <span className="text-center w-full">Tác vụ</span>,
      renderCell: (row) => (
        <>
          {/* new Date() > new Date(row.arrivalTime) && */}
          {row.status !== 'Completed' && (
            <Button
              onClick={() => editBusTripStatus(row)}
              color="primary"
              isDisabled={row.stactus === 'Completed'}
              className="border-none h-8"
            >
              Hoàn thành
            </Button>
          )}
        </>
      ),
    },
  ];
  return (
    <div className="bg-white rounded shadow-md px-4 py-3 h-full">
      <div className="flex items-center justify-between mb-3">
        {auth?.roles[0] === ROLES.BUS_OWNER && (
          <div className="mt-2 flex justify-end items-center w-full">
            <div className="flex gap-2">
              <Button
                onClick={() => createBusDestination()}
                size="sm"
                color="primary"
              >
                Tạo mới điểm đón/trả
              </Button>
              <Button onClick={() => createBusTrip()} size="sm" color="primary">
                Tạo mới chuyến xe
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 items-center">
        <Select
          className="flex-4 xl:flex-3 border-nonet"
          variant="flat"
          radius="sm"
          label="Nơi xuất phát"
          defaultSelectedKeys={from}
          autoComplete="on"
          onChange={(e) => setFrom(e.target.value)}
          placeholder="Nơi đi ?"
          startContent={<i className="fas fa-dot-circle text-blue-500"></i>}
        >
          {PROVINCES.map((province) => (
            <SelectItem key={province.value}>{province.label}</SelectItem>
          ))}
        </Select>
        <Select
          className="flex-4 xl:flex-3 border-none"
          id="toCity"
          value={to}
          variant="flat"
          onChange={(e) => setTo(e.target.value)}
          radius="sm"
          label="Nơi đến"
          autoComplete="on"
          placeholder="Nơi đến ?"
          startContent={<i className="fas fa-map-marker-alt text-error"></i>}
        >
          {PROVINCES.filter((province) => province.value !== from).map(
            (province) => (
              <SelectItem key={province.value}>{province.label}</SelectItem>
            ),
          )}
        </Select>
        <DatePicker
          label="Ngày đi"
          radius="sm"
          classNames={{
            base: 'bg-white',
            selectorButton: 'bg-white',
            inputWrapper: 'bg-transparent',
            input: 'bg-white',
          }}
          onChange={setDate}
          //   hideTimeZone
          //   showMonthAndYearPickers
          //   defaultValue={now(getLocalTimeZone())}
          className="bg-white"
        />
        <Button onClick={loadList} color="primary">
          Tìm kiếm
        </Button>
      </div>

      <div className="mt-4">
        <CustomTable
          columns={columns}
          data={data}
          isLoading={loading}
          //   isShowPagination
          //   total={pagination?.total}
          //   page={pagination?.page}
          //   setPage={(page) => setPagination({ ...pagination, current: page })}
        />
      </div>
    </div>
  );
}
