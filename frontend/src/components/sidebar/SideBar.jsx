import { Tab, Tabs } from '@nextui-org/react';
import { ROLES } from '@utils/constants';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ active }) {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState();
  const { auth } = useAuth();
  useEffect(() => {
    setActiveTab;
    active;
  }, [active]);

  return (
    <Tabs isVertical className="" placement="start" selectedKey={pathname}>
      <Tab key="/profile" as={Link} to="/profile" title="Thông tin cá nhân" />
      <Tab
        key="/change-password"
        as={Link}
        to="/change-password"
        title="Đổi mật khẩu"
      />
      {auth?.roles?.[0] === ROLES.USER && (
        <Tab key="/my-wallet" as={Link} to="/my-wallet" title="Ví của tôi" />
      )}
      {auth?.roles?.[0] === ROLES.USER && (
        <Tab
          key="/my-ticket"
          as={Link}
          to="/my-ticket"
          title="Lịch sử đặt vé"
        />
      )}
      {/* <Tab
        key="/my-review"
        as={Link}
        to="/my-review"
        title="Nhận xét của tôi"
      /> */}
    </Tabs>
  );
}
