import { Button, Card, CardBody, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/SideBar';
import { useAuth } from '../../context/AuthContext';
import { factories } from '../../factory';
import { ToastInfo, ToastNotiError } from '../../utils/Utils';

export default function ChangePasswordPage() {
  const { auth } = useAuth();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  function handleSave() {
    setLoading(true);
    const password = document.getElementById('password').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword2').value;
    if (
      password.length < 6 ||
      newPassword.length < 6 ||
      confirmPassword.length < 6
    ) {
      ToastNotiError('Mật khẩu tối thiểu 8 ký tự');
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      ToastNotiError('Mật khẩu không khớp, vui lòng nhập lại mật khẩu');
      setLoading(false);
      return;
    }
    const data = {
      userId: auth._id,
      email: auth.email,
      oldPassword: password,
      newPassword,
    };
    factories
      .updatePassword(data)
      .then(() => {
        ToastInfo('Cập nhật thông tin thành công');
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.data.message) {
          ToastNotiError('Mật khẩu cũ không chính xác');
          setLoading(false);
          return;
        }
        ToastNotiError('Hệ thống lỗi, vui lòng thử lại');
        setLoading(false);
      });
  }
  return (
    <div className="mx-auto my-20 flex justify-center">
      <div className="flex w-full max-w-[60%] gap-6">
        <div className="w-fit">
          <Sidebar active="1" />
        </div>
        <div className="flex w-full flex-grow">
          <Card className="w-full">
            <CardBody className="w-full gap-4 py-10">
              <div className="flex flex-row items-center justify-center">
                <h5 className="mt-5 text-2xl font-bold">Đổi mật khẩu</h5>
              </div>
              <div className="flex w-full items-center justify-center">
                <form onSubmit={handleSave}>
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
                    id="newPassword"
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    className="mt-5"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        aria-label="toggle password visibility"
                        onClick={toggleVisibility1}
                      >
                        {isVisible1 ? (
                          <i class="fa fa-eye-slash" aria-hidden="true"></i>
                        ) : (
                          <i class="fa fa-eye" aria-hidden="true"></i>
                        )}
                      </button>
                    }
                    type={isVisible1 ? 'text' : 'password'}
                  />
                  <Input
                    id="confirmPassword2"
                    label="Nhập lại mật khẩu"
                    placeholder="Nhập lại mật khẩu"
                    className="mt-5"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        aria-label="toggle password visibility"
                        onClick={toggleVisibility2}
                      >
                        {isVisible2 ? (
                          <i class="fa fa-eye-slash" aria-hidden="true"></i>
                        ) : (
                          <i class="fa fa-eye" aria-hidden="true"></i>
                        )}
                      </button>
                    }
                    type={isVisible2 ? 'text' : 'password'}
                  />
                  <Button
                    isLoading={loading}
                    color="primary"
                    className="mt-5 w-full"
                    onClick={handleSave}
                  >
                    Đổi mật khẩu
                  </Button>
                </form>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
