import HeaderAdmin from '@components/header/HeaderAdmin';
import React, { useState } from 'react';
import AdminSideBar from '../../section/admin/AdminSideBar';
import AdminUser from '../../section/admin/AdminUser';
import Dashboard from '../../section/admin/Dashboard';

export default function AdminPage() {
  const [selectedItem, setSelectedItem] = useState('users');
  const [selectedName, setSelectedName] = useState('');

  const handleItemClick = (itemId, name) => {
    setSelectedItem(itemId);
    setSelectedName(name);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case 'dashboardAll':
        return <Dashboard />;
      case 'users':
        return <AdminUser />;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex w-full">
        <AdminSideBar
          selectedItem={selectedItem}
          onSelectItem={(id, label) => {
            return handleItemClick(id, label);
          }}
        />
        <main className="flex-1 items-start overflow-scroll h-screen">
          <HeaderAdmin title={selectedName} />
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
