import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

// const sidebarItems = [
//   //   { id: 'menu', icon: 'fa-bars', label: 'Menu' },
//   { id: 'dashboard', icon: 'fa-th-large', label: 'Dashboard' },
//   { id: 'users', icon: 'fa-users', label: 'Users', active: true },
//   { id: 'bus', icon: 'fa-bus', label: 'Bus' },
//   { id: 'tasks', icon: 'fa-clipboard-list', label: 'Tasks' },
//   //   { id: 'profile', icon: 'fa-smile', label: 'Profile' },
//   //   { id: 'files', con: 'fa-file-alt', label: 'Files' },
//   //   { id: 'favorites', icon: 'fa-star', label: 'Favorites' },
//   //   { id: 'settings', icon: 'fa-cog', label: 'Settings' },
// ];

const sidebarItems = [
  {
    id: 'dashboardAll',
    icon: 'fa-th-large',
    label: 'Tổng quan',
    roles: ['admin'],
  },
  {
    id: 'host',
    icon: 'fa-bus',
    label: 'Danh sách nhà xe',
    roles: ['admin'],
  },
  {
    id: 'usersAll',
    icon: 'fa-users',
    label: 'Danh sách tài khoản',
    active: true,
    roles: ['admin'],
  },
  {
    id: 'ticketAll',
    icon: 'fa-tasks',
    label: 'Danh sách vé xe',
    active: true,
    roles: ['admin'],
  },
  {
    id: 'dashboard',
    icon: 'fa-th-large',
    label: 'Tổng quan',
    roles: ['chuNhaXe'],
  },
  {
    id: 'users',
    icon: 'fa-users',
    label: 'Danh sách tài khoản',
    active: true,
    roles: ['chuNhaXe'],
  },
  {
    id: 'bus',
    icon: 'fa-bus',
    label: 'Danh sách xe',
    roles: ['chuNhaXe', 'taiXe', 'phuXe'],
  },
  {
    id: 'tasks',
    icon: 'fa-clipboard-list',
    label: 'Danh sách vé xe',
    roles: ['chuNhaXe', 'nhanVien'],
  },
  {
    id: 'profile',
    icon: 'fa-smile',
    label: 'Thông tin tài khoản',
    roles: ['chuNhaXe', 'nhanVien', 'taiXe', 'phuXe'],
  },
];
export default function AdminSideBar({ selectedItem, onSelectItem }) {
  const [currentUserRole, setCurrentUserRole] = useState('admin');
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(currentUserRole),
  );

  return (
    <aside className="w-12 bg-white h-screen shadow-md justify-between flex flex-col">
      <div className="flex flex-col items-center py-3">
        {filteredItems.map((item) => (
          <Button
            variant="ghost"
            color="transparent"
            size="sm"
            onClick={() => onSelectItem(item.id, item.label)}
            className="border-none  items-center justify-center flex   "
          >
            <i
              key={item.id}
              className={`fas ${item.icon} text-gray-500 cursor-pointer ${
                selectedItem === item.id ? 'text-blue-500' : 'text-gray-500'
              }`}
            ></i>
          </Button>
        ))}
      </div>
      <div className="flex flex-col">
        <Button onClick={() => setCurrentUserRole('admin')}>A</Button>
        <Button onClick={() => setCurrentUserRole('chuNhaXe')}>B</Button>
        <Button onClick={() => setCurrentUserRole('taiXe')}>C</Button>
        <Button onClick={() => setCurrentUserRole('phuXe')}>D</Button>
      </div>
    </aside>
  );
}
