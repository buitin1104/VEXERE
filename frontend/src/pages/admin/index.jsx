import HeaderAdmin from '@components/header/HeaderAdmin';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import AdminBusList from '../../section/admin/AdminBusList';
import AdminRequestHost from '../../section/admin/AdminRequestHost';
import AdminSideBar from '../../section/admin/AdminSideBar';
import AdminTicketList from '../../section/admin/AdminTicketList';
import AdminUser from '../../section/admin/AdminUser';
import Dashboard from '../../section/admin/Dashboard';

export default function AdminPage() {
  const [selectedItem, setSelectedItem] = useState('dashboardAll');
  const [selectedName, setSelectedName] = useState('Tổng quan');
  const { auth, loading } = useAuth();
  const { onOpen } = useModalCommon();
  const navigator = useNavigate();
  const handleItemClick = (itemId, name) => {
    setSelectedItem(itemId);
    setSelectedName(name);
  };

  //   useEffect(() => {
  //     if (!loading) {
  //       // if (auth?.role !== '1') {
  //       //   navigator(RouterPath.NOT_FOUND);
  //       //   return;
  //       // }
  //       // if (!auth) {
  //       //   onOpen({
  //       //     view: <LoginModal />,
  //       //     title: 'Đăng nhập',
  //       //     showFooter: false,
  //       //   });
  //       // }
  //     }
  //   }, [auth, loading]);

  const renderContent = () => {
    switch (selectedItem) {
      case 'dashboardAll':
        return <Dashboard isAdmin />;
      case 'usersAll':
        return <AdminUser isAdmin />;
      case 'busAll':
        return <AdminBusList isAdmin />;
      case 'request':
        return <AdminRequestHost isAdmin />;
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <AdminUser />;
      case 'buses':
        return <AdminBusList />;
      case 'ticketAll':
        return <AdminTicketList />;
      case 'tickets':
        return <AdminTicketList />;
      default:
        return null;
    }
  };

  //   if (loading)
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
