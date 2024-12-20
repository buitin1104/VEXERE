import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, Input } from '@nextui-org/react';
import { BUSES_LIST, ROLES } from '@utils/constants';
import { convertStringToNumber, getDate } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory/index';
import CreateBusDestinationModal from './modal/CreateBusDestination';
import CreateBusTripModal from './modal/CreateBusTripModal';

export default function AdminBusRoute({ isAdmin }) {
  const [keyword, setKeyword] = useState();
  const [data, setData] = useState([]);
  console.log('🚀 ~ AdminBusRoute ~ data:', data);
  const [pagination, setPagination] = useState();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const { onOpen } = useModalCommon();
  useEffect(() => {
    loadList();
  }, [keyword, pagination?.current]);

  function createBusTrip() {
    onOpen({
      view: <CreateBusTripModal onReload={loadList} />,
      title: 'Tạo chuyến xe mới',
      size: '4xl',
    });
  }
  function editBusTrip(row) {
    onOpen({
      view: <CreateBusTripModal onReload={loadList} item={row} />,
      title: 'Tạo chuyến xe mới',
      size: '4xl',
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
      //   ownerId: isAdmin ? '' : auth._id,
      //   page: pagination?.current,
      ...(keyword ? { keyword } : {}),
      ...(auth.roles[0] === ROLES.BUS_OWNER ? { ownerId: auth._id } : {}),
    };
    factories
      .getListBusesTrip(params)
      .then((data) => {
        if (data) setData(data?.busTrips);
        setLoading(false);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }

  const columns = [
    {
      id: 'BusName',
      label: 'Biển số xe',
      renderCell: (row) => <div className="w-32">{row?.bus?.busNumber}</div>,
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
        <div className="">
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
          {row.origin.name} - {row?.destination?.name}
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
    // {
    //   id: 'action',
    //   label: 'Tác vụ',
    //   headCell: () => <span className="text-center w-full">Tác vụ</span>,
    //   renderCell: (row) => (
    //     <div className="">
    //       <Tooltip content="Xóa">
    //         <Button
    //           variant="ghost"
    //           onClick={() => editBusTrip(row)}
    //           size="sm"
    //           disabled
    //           className="border-none max-w-8 h-8"
    //         >
    //           <i className="fas fa-edit text-blue-500 text-sm"></i>
    //         </Button>
    //       </Tooltip>
    //     </div>
    //   ),
    // },
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

      <Input
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm kiếm biển số"
        className="w-full outline-none bg-gray-100 rounded-lg"
        startContent={<i className="fas fa-search text-gray-500 mr-2"></i>}
      />
      <div className="mt-4">
        <CustomTable columns={columns} data={data} isLoading={loading} />
      </div>
    </div>
  );
}
