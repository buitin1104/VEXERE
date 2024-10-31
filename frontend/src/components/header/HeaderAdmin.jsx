import { Button } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function HeaderAdmin({ title }) {
  const { logout } = useAuth();
  const navigator = useNavigate();
  function handleLogout() {
    logout();
    navigator('/');
  }
  return (
    <header className="z-20 flex items-center justify-between rounded-2xl mb-1 shadow-2xl p-2 sticky top-2 mx-4 bg-white">
      <div className="flex items-center bg-white p-2 rounded  w-1/2">
        <p className="font-bold">{title}</p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center ml-4">
          <span className="mr-2">Duy Anh</span>
          <i className="fas fa-user-circle text-gray-500"></i>
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
