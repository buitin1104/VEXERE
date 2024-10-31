import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, Chip, Input, Tab, Tabs, Tooltip } from '@nextui-org/react';
import React, { useState } from 'react';

const dataBusList = [
  {
    Address: 'Điện Biên Phủ',
    PhoneNumber: '0987654321',
    BusName: 'Duy Anh',
    BranchName: 'Nhà xe Duy Anh',
    TicketCount: '3',
    TripFrom: '14:30',
    TripTo: '14:30',
    Route: 'Hà Nội - Thanh Hóa',
    status: 'Đang làm việc',
    Type: 'Pickup',
  },
  {
    Address: 'Điện Biên Phủ',
    PhoneNumber: '0987654321',
    BusName: 'Duy Anh',
    BranchName: 'Nhà xe Duy Anh',
    TicketCount: '2',
    TripFrom: '14:30',
    TripTo: '14:30',
    Trip: '14:30',
    Route: 'Hà Nội - Thanh Hóa',
    status: 'Đang tạm nghỉ',
    Type: 'Pickup',
  },
  {
    Address: 'Điện Biên Phủ',
    PhoneNumber: '0987654321',
    BusName: 'Duy Anh',
    BranchName: 'Nhà xe Duy Anh',
    TripFrom: '14:30',
    TripTo: '14:30',
    TicketCount: '1',
    Trip: '14:30',
    status: 'Đang làm việc',
    Route: 'Hà Nội - Thanh Hóa',
    Type: 'Pickup',
  },
  {
    Address: 'Điện Biên Phủ',
    PhoneNumber: '0987654321',
    BusName: 'Duy Anh',
    TicketCount: '1',
    TripFrom: '14:30',
    TripTo: '14:30',
    BranchName: 'Nhà xe Duy Anh',
    status: 'Đang làm việc',
    Trip: '14:30',
    Route: 'Hà Nội - Thanh Hóa',
    Type: 'Pickup',
  },
];

const columns = [
  {
    id: 'BusName',
    label: 'Tên xe',
    renderCell: (row) => <div className="w-40">{row.BusName}</div>,
  },
  {
    id: 'BranchName',
    label: 'Nhà xe',
    renderCell: (row) => <div className="w-40">{row.BranchName}</div>,
  },
  {
    id: 'Route',
    label: 'Tuyến đường',
    renderCell: (row) => <span>{row.Route}</span>,
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
    renderCell: (row) => <span>{row.PhoneNumber}</span>,
  },
  {
    id: 'trip',
    label: 'Thời gian',
    renderCell: (row) => (
      <span>
        {row.TripFrom} - {row.TripTo}
      </span>
    ),
  },
  {
    id: 'status',
    label: 'Trạng thái',
    renderCell: (row) => (
      <div className="w-36">
        <Chip color={row.status === 'Đang làm việc' ? 'primary' : 'default'}>
          {row.status}
        </Chip>
      </div>
    ),
  },
  {
    id: 'action',
    label: 'Tác vụ',
    headCell: () => <span className="text-center w-full">Tác vụ</span>,
    renderCell: (row) => (
      <div className="">
        <Tooltip content="Xóa">
          <Button variant="ghost" size="sm" className="border-none max-w-8 h-8">
            <i className="fas fa-trash-alt text-pink-500 text-sm"></i>
          </Button>
        </Tooltip>
      </div>
    ),
  },
];

export default function AdminBusList() {
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
            <Tab key="2" title="Đang hoạt động" />
            <Tab key="3" title="Đang tạm nghỉ" />
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
        <CustomTable columns={columns} data={dataBusList} />
      </div>
    </div>
  );
}
