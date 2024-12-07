import HeaderAdmin from '@components/header/HeaderAdmin';
import LoginModal from '@components/header/Login';
import { ROLES, sidebarItems } from '@utils/constants';
import React, { useEffect, useState } from 'react';
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
  const [filterItems, setFilterItems] = useState([]);

  const { auth, loading } = useAuth();
  const { onOpen } = useModalCommon();
  const navigator = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (auth?.roles?.[0] !== ROLES.ADMIN) {
        navigator(RouterPath.NOT_FOUND);
        return;
      }
      if (!auth) {
        onOpen({
          view: <LoginModal />,
          title: 'Đăng nhập',
          showFooter: false,
        });
      }
      const newList = sidebarItems.filter((item) =>
        item.roles.includes(auth.roles[0]),
      );
      setFilterItems(newList);
    }
  }, [auth, loading]);

  const handleItemClick = (itemId, name) => {
    setSelectedItem(itemId);
    setSelectedName(name);
  };

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
          filteredItems={filterItems}
        />
        <main className="flex-1 items-start overflow-scroll h-screen">
          <HeaderAdmin title={selectedName} />
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
