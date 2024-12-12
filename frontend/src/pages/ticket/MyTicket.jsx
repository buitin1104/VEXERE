import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, Card, CardBody, Chip } from '@nextui-org/react';
import { TICKET_STATUS } from '@utils/constants';
import { getDate } from '@utils/Utils';
import { default as React, useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/SideBar';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory';
import TicketModal from './TicketModal';

const ticketData = [
  {
    Address: 'Điện Biên Phủ',
    PhoneNumber: '0987654321',
    PassengerName: 'Duy Anh',
    BranchName: 'Hoàng Long',
    BusName: 'Hoàng Long 1',
    TicketCount: '2',
    Seats: '1,2',
    lat: '16.05632000000001',
    lng: '108.17320332563219',
    price: '500000',
    DepartureTime: '14:30',
    ArrivalTime: '18:30',
    Route: 'Hà Nội - Thanh Hóa',
    Status: 'Đã thanh toán',
    Type: 'Pickup',
  },
  {
    Address: 'Nguyễn Trãi',
    PhoneNumber: '0981234567',
    PassengerName: 'Minh Tú',
    Seats: '3',
    BranchName: 'Hoàng Long',
    lat: '21.028535524073362',
    lng: '105.7783269830858',
    BusName: 'Hoàng Long 2',
    TicketCount: '1',
    DepartureTime: '09:00',
    price: '323000',
    ArrivalTime: '13:00',
    Route: 'Hà Nội - Nam Định',
    Status: 'Đã hủy',
    Type: 'Dropoff',
  },
  // Thêm nhiều vé khác nếu cần
];

export default function MyTicketPage() {
  const columns = [
    {
      id: 'BusName',
      label: 'Tên xe',
      renderCell: (row) => <div className="w-28">{row.bus.busNumber}</div>,
    },
    {
      id: 'Route',
      label: 'Đi từ',
      renderCell: (row) => (
        <div className="w-32">
          <span>{row.tripId.origin.name}</span>
        </div>
      ),
    },
    {
      id: 'Route2',
      label: 'Đi đên',
      renderCell: (row) => (
        <div className="w-32">
          <span>{row.tripId.destination.name}</span>
        </div>
      ),
    },
    {
      id: 'time',
      label: 'Thời Gian',
      renderCell: (row) => (
        <div className="w-32">{getDate(row.tripId.departureTime, 3)}</div>
      ),
    },
    {
      id: 'Status',
      label: 'Trạng Thái',
      renderCell: (row) => (
        <Chip
          color={TICKET_STATUS.find((x) => x.value === row.status)?.color}
          className="text-white"
        >
          {TICKET_STATUS.find((x) => x.value === row.status)?.label}
        </Chip>
      ),
    },
    {
      id: 'detail',
      label: '',
      renderCell: (row) => (
        <Button
          onClick={() => openDetail(row)}
          variant="light"
          className="rounded-lg"
          color={'primary'}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState();
  const { onOpen } = useModalCommon();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth) {
      loadList();
    }
  }, [auth]);
  function loadList() {
    setLoading(true);
    const params = {
      userId: auth._id,
      page: pagination?.current,
    };
    factories
      .getListTicket(params)
      .then((data) => {
        setData(data?.tickets);
        setLoading(false);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }
  function openDetail(row) {
    onOpen({
      view: <TicketModal item={row} />,
      title: 'Chi tiết vé',
      size: 'xl',
    });
  }

  return (
    <div className="mx-auto my-20 flex justify-center items-center">
      <div className="flex w-full max-w-[70%] gap-6">
        <div className="w-fit">
          <Sidebar />
        </div>
        <div className="flex flex-grow max-w-[900px]">
          <Card className="w-full">
            <CardBody className="w-full gap-4">
              <div className="flex flex-row justify-between p-2">
                <h5 className="text-2xl font-bold">Lịch sử đặt vé</h5>
              </div>
              <div>
                <CustomTable
                  columns={columns}
                  data={data ?? []}
                  isLoading={loading}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
