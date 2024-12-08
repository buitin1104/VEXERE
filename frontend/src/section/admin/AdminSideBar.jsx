import { Button } from '@chakra-ui/react';
import { cn } from '@utils/Utils';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminSideBar({
  selectedItem,
  onSelectItem,
  filteredItems = [],
}) {
  const { logout } = useAuth();
  const navigator = useNavigate();
  function handleLogout() {
    logout();
    navigator('/');
  }
  return (
    <aside
      className="w-12 sticky left-4 rounded-xl top-[10px]  flex-col bg-white bg-white/80 backdrop-blur-2xl border-b border-gray-200 shadow-xl z-50 flex items-center justify-center transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.10)',
        height: 'fit-content',
      }}
    >
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
    </aside>
  );
}
