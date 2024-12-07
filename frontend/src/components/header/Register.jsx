import { Button, Input } from '@nextui-org/react';
import { ROLES } from '@utils/constants';
import { EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory';
import { ToastInfo, ToastNotiError } from '../../utils/Utils';
import LoginModal from './Login';

const RegisterModal = () => {
  const { onOpen, onClose } = useModalCommon();
  const { login } = useAuth();

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const openLogin = () => {
    onOpen({
      view: <LoginModal />,
      title: 'Đăng nhập',
      showFooter: false,
    });
  };

  const handleSignUpEmail = () => {
    setLoading(true);
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (!password || !confirmPassword || !email) {
      ToastNotiError('Vui lòng nhập thông tin');
      setLoading(false);
      return;
    }
    if (password.length < 8 || confirmPassword.length < 8) {
      ToastNotiError('Mật khẩu tối thiểu 8 ký tự');
    }
    if (password !== confirmPassword) {
      ToastNotiError('Mật khẩu không khớp, vui lòng nhập lại mật khẩu');
      setLoading(false);
      return;
    }
    const metaData = {
      email,
      password: password,
      fullName: email.replace('@gmail.com', ''),
      profilePictureUrl:
        'https://ui-avatars.com/api/?name=' + email.replace('@gmail.com', ''),
      roles: [ROLES.USER],
    };
    factories
      .getSignUpEmail(metaData)
      .then((data) => {
        ToastInfo('Đăng ký tài khoản thành công');
        setLoading(false);
        openLogin();
      })
      .catch((error) => {
        setLoading(false);
        const dataE = error.response.data.error;
        if (dataE.includes('E11000')) {
          ToastNotiError('Email đã tồn tại');
          return;
        }
        ToastNotiError(dataE);
      });
  };

  async function linkEmailAndPassword(user, email, password) {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      const linkedUser = await linkWithCredential(user, credential);
      return linkedUser;
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('Email đã liên kết với tài khoản khác.');
      } else {
        console.error('Lỗi liên kết Email & Password:', error.message);
      }
      throw error;
    }
  }

  //   const handleGoogleSignUp = async () => {
  //     try {
  //       const result = await signInWithPopup(auth, googleProvider);
  //       const user = result.user;
  //       console.log('🚀 ~ ~ user:', user);
  //       await linkEmailAndPassword(user, email, user.uid);
  //       ToastInfo('Đăng ký thành công.');
  //     } catch (error) {
  //       if (
  //         error?.response?.data.error ===
  //         'Firebase: Error (auth/email-already-in-use).'
  //       ) {
  //         ToastNotiError('Email đã được sử dụng');
  //         return;
  //       }
  //       ToastNotiError('Đăng ký thất bại, vui lòng thử lại.');
  //     }
  //   };

  return (
    <div>
      <div className="w-full">
        <Input type="email" label="Email" id="email" />
        <Input
          id="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          className="mt-5"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              aria-label="toggle password visibility"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <i class="fa fa-eye-slash" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-eye" aria-hidden="true"></i>
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
        />
        <Input
          id="confirmPassword"
          label="Nhập lại mật khẩu"
          placeholder="Nhập lại mật khẩu"
          className="mt-5"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              aria-label="toggle password visibility"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <i class="fa fa-eye-slash" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-eye" aria-hidden="true"></i>
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
        />
      </div>

      <Button
        onClick={handleSignUpEmail}
        className="mt-8 w-full rounded-lg"
        variant="solid"
        color="primary"
        isLoading={loading}
      >
        Đăng ký
      </Button>

      {/* <div className="mt-4 flex w-full items-center">
				<div className="h-[1px] flex-grow bg-neutral-200" />
				<p className="px-2">hoặc</p>
				<div className="h-[1px] flex-grow bg-neutral-200" />
			</div> */}

      <div className="mt-4">
        {/* <Button
					radius={'sm'}
					color="primary"
					className="w-full"
					onClick={handleGoogleSignUp}
				>
					Đăng ký với Google
				</Button> */}
        <div className="mt-4 flex">
          <p>Bạn đã có tài khoản?</p>
          <button
            onClick={() => openLogin()}
            className="px-2 font-bold text-cyan-dark"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
