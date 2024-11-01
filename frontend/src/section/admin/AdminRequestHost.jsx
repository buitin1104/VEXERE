import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, Input } from '@nextui-org/react';
import React from 'react';

const ticketData = [
  {
    Address: 'Điện Biên Phủ',
    PhoneNumber: '0987654321',
    PassengerName: 'Duy Anh',
    BranchName: 'Hoàng Long',
    BusName: 'Hoàng Long 1',
    TicketCount: '3',
    price: '123000',
    DepartureTime: '14:30',
    ArrivalTime: '18:30',
    Route: 'Hà Nội - Thanh Hóa',
    Status: 'Đã đặt',
    Type: 'Pickup',
  },
  {
    Address: 'Nguyễn Trãi',
    PhoneNumber: '0981234567',
    PassengerName: 'Minh Tú',
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

const columns = [
  {
    id: 'PassengerName',
    label: 'Họ và Tên',
    renderCell: (row) => <div className="w-40">{row.PassengerName}</div>,
  },
  {
    id: 'BranchName',
    label: 'Tên Nhà xe',
    renderCell: (row) => <div className="w-40">{row.BranchName}</div>,
  },
  {
    id: 'Route',
    label: 'Tuyến Đường',
    renderCell: (row) => <span>{row.Route}</span>,
  },
  {
    id: 'PhoneNumber',
    label: 'Số Điện Thoại',
    renderCell: (row) => <span>{row.PhoneNumber}</span>,
  },
  {
    id: 'time',
    label: 'Thời Gian',
    renderCell: (row) => (
      <span>
        {row.DepartureTime} - {row.ArrivalTime}
      </span>
    ),
  },
  {
    id: 'Status',
    label: 'Trạng Thái',
    renderCell: (row) => (
      <div className="">
        <Button size="sm" color={'default'}>
          Duyệt
        </Button>
      </div>
    ),
  },
];

export default function AdminRequestHost() {
  return (
    <div
      className="bg-white rounded shadow-md px-4 py-3  pt-6"
      style={{
        height: 'calc(100% - 100px)',
      }}
    >
      <Input
        type="text"
        placeholder="Tìm kiếm tên, số điện thoại"
        className="w-full outline-none bg-gray-100 rounded-lg"
        startContent={<i className="fas fa-search text-gray-500 mr-2"></i>}
      />
      <div className="mt-4">
        <CustomTable columns={columns} data={ticketData} />
      </div>
    </div>
  );
}
