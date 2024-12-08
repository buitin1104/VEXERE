import { Avatar, Button } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function HeaderAdmin({ title }) {
  const { logout, auth } = useAuth();
  const navigator = useNavigate();
  function handleLogout() {
    logout();
    navigator('/');
  }
  return (
    <header
      className="z-20 flex items-center justify-between rounded-2xl mb-1 shadow-2xl p-2  mx-4 backdrop-blur-md sticky top-[10px]"
      style={{
        background: 'rgba(255, 255, 255, 0.50)',
        height: '60px',
      }}
    >
      <div className="flex items-center p-2 rounded  w-1/2">
        <p className="font-bold">{title}</p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center ml-4">
          <span className="mr-2">{auth?.fullName}</span>
          <Avatar size="sm" src={auth?.profilePictureUrl} />
        </div>
        <Button
          onClick={handleLogout}
          className="ml-4"
          size="sm"
          variant="shadow"
          color="danger"
        >
          Đăng xuất
        </Button>
      </div>
    </header>
  );
}
