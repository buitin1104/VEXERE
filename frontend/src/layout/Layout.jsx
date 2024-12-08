import { RouterPath } from '@router/RouterPath';
import { ROLES } from '@utils/constants';
import React, { useEffect } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { useAuth } from '../context/AuthContext';
import useRouter from '../hook/use-router';

const Layout = ({
  children,
  isShowFooter = true,
  showText = false,
  showSearch = false,
}) => {
  const { auth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (auth?.roles === ROLES.ADMIN || auth?.roles === ROLES.BUS_OWNER) {
      router.push({ pathname: RouterPath.ADMIN });
    }
  }, [auth]);
  return (
    <>
      <Header showText={showText} showSearch={showSearch} />
      <main>{children}</main>
      {isShowFooter && <Footer />}
    </>
  );
};

export default Layout;
