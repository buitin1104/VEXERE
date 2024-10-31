import { CustomTable } from '@components/custom-table/CustomTable';
import { Chip, Input, Tab, Tabs } from '@nextui-org/react';
import { convertStringToNumber } from '@utils/Utils';
import React, { useState } from 'react';

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
    label: 'Tên Hành Khách',
    renderCell: (row) => <div className="w-40">{row.PassengerName}</div>,
  },
  {
    id: 'BranchName',
    label: 'Nhà xe',
    renderCell: (row) => <div className="w-40">{row.BranchName}</div>,
  },
  {
    id: 'BusName',
    label: 'Tên xe',
    renderCell: (row) => <div className="w-40">{row.BusName}</div>,
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
    id: 'count',
    label: 'Giá tiền',
    renderCell: (row) => (
      <span>{convertStringToNumber(row.TicketCount * row.price)}</span>
    ),
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
      <div className="w-36">
        <Chip color={row.Status === 'Đã đặt' ? 'primary' : 'default'}>
          {row.Status}
        </Chip>
      </div>
    ),
  },
];

export default function TicketListPage() {
  const [activeTab, setActiveTab] = useState();

  return (
    <div className="bg-white rounded shadow-md px-4 py-3 h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex">
          <Tabs
            variant="light"
            color="primary"
            aria-label="Tabs colors"
            radius="lg"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
          >
            <Tab key="1" title="Tất cả" />
            <Tab key="2" title="Đã đặt" />
            <Tab key="3" title="Đã hủy" />
          </Tabs>
        </div>
      </div>

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
