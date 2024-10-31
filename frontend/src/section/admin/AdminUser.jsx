import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, Chip, Input, Tab, Tabs, Tooltip } from '@nextui-org/react';
import React, { useState } from 'react';

const data2 = [
  {
    name: 'Nguyễn Văn A',
    role: 'Nhân viên',
    account: 'nguyen.vxr',
    accountType: 'Admin',
    phone: '0987 654 321',
    email: 'nguyenvana@gmail.com',
    gender: 'Nam',
    dob: '16/12/1995',
    branch: 'Văn phòng A',
    status: 'Đang làm việc',
  },
  {
    name: 'Nguyễn Văn A',
    role: 'Tài xế',
    account: 'nguyen.vxr',
    accountType: 'Tài xế',
    phone: '0987 654 321',
    email: 'nguyenvana@gmail.com',
    gender: 'Nữ',
    dob: '16/12/1995',
    branch: 'Văn phòng A',
    status: 'Đang làm việc',
  },
  {
    name: 'Nguyễn Văn A',
    role: 'Phụ xe',
    account: 'nguyen.vxr',
    accountType: 'Phụ xe',
    phone: '0987 654 321',
    email: 'nguyenvana@gmail.com',
    gender: 'Nam',
    dob: '16/12/1995',
    branch: 'Văn phòng A',
    status: 'Đã nghỉ việc',
  },
  {
    name: 'Nguyễn Văn A',
    role: 'Hướng dẫn viên',
    account: 'nguyen.vxr',
    accountType: 'Nhóm quyền',
    phone: '0987 654 321',
    email: 'nguyenvana@gmail.com',
    gender: 'Nữ',
    dob: '16/12/1995',
    branch: 'Văn phòng A',
    status: 'Đã nghỉ việc',
  },
];

const columns = [
  {
    id: 'name',
    label: 'Họ và tên',
    renderCell: (row) => <div className="w-40">{row.name}</div>,
  },
  {
    id: 'account',
    label: 'Tài khoản',
    renderCell: (row) => <span>{row.account}</span>,
  },
  {
    id: 'role',
    label: 'Quyền truy cập',
    renderCell: (row) => <span>{row.role}</span>,
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
    renderCell: (row) => <span>{row.phone}</span>,
  },
  {
    id: 'gender',
    label: 'Giới tính',
    renderCell: (row) => <span>{row.gender}</span>,
  },
  {
    id: 'dob',
    label: 'Ngày sinh',
    renderCell: (row) => <span>{row.dob}</span>,
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
      <div className="w-48">
        <Button
          variant="ghost"
          size="sm"
          className="border-none w-2 max-w-2 h-8"
        >
          <i className="fas fa-pen text-gray-400 text-sm"></i>
        </Button>
        <Tooltip content="Details">
          <Button variant="ghost" size="sm" className="border-none max-w-8 h-8">
            <i className="fas fa-eye text-gray-400 text-sm"></i>
          </Button>
        </Tooltip>
        <Tooltip content="Details">
          <Button variant="ghost" size="sm" className="border-none max-w-8 h-8">
            <i className="fas fa-trash-alt text-pink-500 text-sm"></i>
          </Button>
        </Tooltip>
      </div>
    ),
  },
];

export default function AdminUser() {
  const [activeTab, setActiveTab] = useState();
  return (
    <div className="bg-white rounded shadow-md px-4 py-3">
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
            <Tab key="2" title="Nhân viên" />
            <Tab key="3" title="Tài xế" />
            <Tab key="4" title="Phụ xe" />
          </Tabs>
        </div>
        <h1 className="text-xl font-bold"></h1>
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          size="sm"
        >
          + Thêm nhân viên
        </Button>
      </div>

      <Input
        type="text"
        placeholder="Tìm kiếm tên, số điện thoại"
        className="w-full outline-none bg-gray-100 rounded-lg"
        startContent={<i className="fas fa-search text-gray-500 mr-2"></i>}
      />
      <div className="mt-4">
        <CustomTable columns={columns} data={data2} />
      </div>
    </div>
  );
}
