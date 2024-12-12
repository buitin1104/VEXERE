import { Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ active }) {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState();

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
      <Tab key="/my-wallet" as={Link} to="/my-wallet" title="Ví của tôi" />
      <Tab key="/my-ticket" as={Link} to="/my-ticket" title="Lịch sử đặt vé" />
      {/* <Tab
        key="/my-review"
        as={Link}
        to="/my-review"
        title="Nhận xét của tôi"
      /> */}
    </Tabs>
  );
}
