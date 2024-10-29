import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useModalCommon } from '../../context/ModalContext';
import LoginModal from './Login';

const RegisterModal = () => {
  const [phone, setPhone] = useState('');
  const { onOpen } = useModalCommon();
  const openLogin = () => {
    onOpen({
      view: <LoginModal />,
      title: 'Đăng nhập',
      showFooter: false,
    });
  };

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
        <Button radius={'sm'} color="primary" className="w-full">
          Đăng nhập với Google
        </Button>
        <div className="flex mt-4">
          <p>Bạn đã có tài khoản?</p>
          <button
            onClick={() => openLogin()}
            className="px-2 text-cyan-dark font-bold"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
