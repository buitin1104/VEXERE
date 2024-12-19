import HeaderAdmin from '@components/header/HeaderAdmin';
import LoginModal from '@components/header/Login';
import { RouterPath } from '@router/RouterPath';
import { ROLES, sidebarItems } from '@utils/constants';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import AdminBusList from '../../section/admin/AdminBusList';
import AdminBusRoute from '../../section/admin/AdminBusRoute';
import AdminProfile from '../../section/admin/AdminProfile';
import AdminRequestHost from '../../section/admin/AdminRequestHost';
import AdminReviewList from '../../section/admin/AdminReviewList';
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
      if (!auth) {
        onOpen({
          view: <LoginModal />,
          title: 'Đăng nhập',
          showFooter: false,
        });
      }
      if (auth.roles?.[0] === ROLES.USER) {
        navigator(RouterPath.NOT_FOUND);
        return;
      }
      const newList = sidebarItems.filter((item) =>
        item.roles.includes(auth.roles[0]),
      );
      setSelectedItem(newList[0].id);
      setSelectedName(newList[0].label);
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
      case 'review':
        return <AdminReviewList />;
      case 'users':
        return <AdminUser />;
      case 'buses':
        return <AdminBusList />;
      case 'bus-trip':
        return <AdminBusRoute />;
      case 'ticketAll':
        return <AdminTicketList />;
      case 'tickets':
        return <AdminTicketList />;
      case 'profile':
        return <AdminProfile />;
      default:
        return null;
    }
  };

  //   if (loading)
  return (
    <div className="flex flex-row bg-white relative">
      <div className="flex w-full  relative">
        <AdminSideBar
          selectedItem={selectedItem}
          onSelectItem={(id, label) => {
            return handleItemClick(id, label);
          }}
          filteredItems={filterItems}
        />
        <main className="flex-1 items-start h-screen pl-5">
          <HeaderAdmin title={selectedName} />
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
