import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useAuth } from '../..//context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import RegisterModal from './Register';

const userTemplate = {
  id: 1,
  name: 'Nguyen Van A',
  avatar: 'https://example.com/path/to/avatar.jpg',
  email: 'nguyenvana@example.com',
  phone: '0123456789',
  address: '123 Đường ABC, Quận XYZ, Thành phố HCM',
  dateOfBirth: '1990-01-01',
  role: '1',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const LoginModal = () => {
  const [phone, setPhone] = useState('');
  const { onOpen, onClose } = useModalCommon();
  const { login } = useAuth();
  function openRegister() {
    onOpen({
      view: <RegisterModal />,
      title: 'Đăng ký',
      showFooter: false,
    });
  }

  function handleLogin() {
    login(userTemplate);
    onClose();
  }

  return (
    <div>
      <div className="w-full">
        <PhoneInput
          placeholder="Enter phone number"
          value={phone}
          country={'vn'}
          onChange={(e) => setPhone(e)}
          containerStyle={{ width: '100%', borderRadius: '20px' }}
          inputStyle={{ width: '100%' }}
        />
      </div>

      <Button className="w-full rounded-lg mt-8">Tiếp tục</Button>

      <div className="mt-4 w-full flex items-center">
        <div className="flex-grow h-[1px] bg-neutral-200" />
        <p className="px-2">hoặc</p>
        <div className="flex-grow h-[1px] bg-neutral-200" />
      </div>

      <div className="mt-4">
        <Button
          radius={'sm'}
          color="primary"
          className="w-full"
          onClick={handleLogin}
        >
          Đăng nhập với Google
        </Button>
        <div className="flex mt-4">
          <p>Bạn chưa có tài khoản?</p>
          <button
            onClick={() => openRegister()}
            className="px-2 text-cyan-dark font-bold"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
