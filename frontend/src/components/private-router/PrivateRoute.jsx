import LoginModal from '@components/header/Login';
import { RouterPath } from '@router/RouterPath';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';

const PrivateRoute = ({ element, isCheckAdmin = false }) => {
  const { auth, loading } = useAuth();
  const { onOpen } = useModalCommon();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isCheckAdmin && auth?.role !== '1') {
        navigate(RouterPath.NOT_FOUND);
        return;
      }

      if (!auth && !isCheckAdmin) {
        onOpen({
          view: <LoginModal />,
          title: 'Đăng nhập',
          showFooter: false,
        });
      }
    }
  }, [auth, loading, isCheckAdmin, navigate, onOpen]);

  // Chỉ render `element` nếu người dùng có quyền
  if ((isCheckAdmin && auth?.role === '1') || (!isCheckAdmin && auth)) {
    return element;
  }
  return null;
};

export default PrivateRoute;
