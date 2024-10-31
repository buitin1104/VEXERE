import { Button } from '@chakra-ui/react';
import { cn } from '@utils/Utils';
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
    id: 'busAll',
    icon: 'fa-bus',
    label: 'Danh sách chuyến xe',
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
    id: 'request',
    icon: 'fa-clipboard-list',
    label: 'Đăng ký nhà xe mới',
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
    id: 'buses',
    icon: 'fa-bus',
    label: 'Danh sách chuyến xe',
    roles: ['chuNhaXe', 'taiXe', 'phuXe'],
  },
  {
    id: 'tickets',
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
  const [currentUserRole, setCurrentUserRole] = useState('chuNhaXe');
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(currentUserRole),
  );

  return (
    <aside className="w-12 bg-white h-screen shadow-md justify-between flex flex-col">
      <div className="flex flex-col items-center py-3">
        {filteredItems.map((item) => {
          return (
            <Button
              variant={'ghost'}
              onClick={() => onSelectItem(item.id, item.label)}
              className={cn(
                'w-8 border-none items-center justify-center flex p-none ',
                selectedItem === item.id && 'bg-blue-100',
              )}
            >
              <i
                key={item.id}
                className={`fas ${item.icon} cursor-pointer ${
                  selectedItem === item.id ? 'text-blue-500' : 'text-gray-500'
                }`}
              ></i>
            </Button>
          );
        })}
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
