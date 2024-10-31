import DatePickerField from '@components/common/DatePickerField';
import InputField from '@components/common/InputField';
import Sidebar from '@components/sidebar/SideBar';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

export default function ProfileManagerPage() {
  const { auth } = useAuth();
  const methods = useForm();
  const [change, setChange] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (auth) {
      setValue('fullName', auth.name || ''); // Sử dụng giá trị thực từ auth
      setValue('email', auth.email || '');
      setValue('phone', auth.phone || '');
      //   setValue('dob', auth.dateOfBirth ? new Date(auth.dateOfBirth) : null);
      setValue('gender', auth.gender || '');
    }
  }, [auth, setValue]);

  function handleSave() {
    console.log('save');
  }

  return (
    <div className="mx-auto flex justify-center my-20">
      <div className="max-w-[60%] flex w-full gap-6">
        <div className="w-fit">
          <Sidebar active="1" />
        </div>
        <div className="flex-grow flex">
          <Card className="w-full">
            <CardHeader className="font-bold">Thông tin cá nhân</CardHeader>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSave)}>
                <CardBody className="w-full gap-4">
                  <div className="flex gap-4">
                    <InputField
                      label={change && 'Họ và tên'}
                      placeholder="Nhập họ và tên"
                      name={'fullName'}
                      register={register}
                      isRequired
                      errors={errors}
                    />
                    <InputField
                      placeholder="Nhập số điện thoại"
                      label={change && 'Số điện thoại'}
                      name={'phone'}
                      isRequired
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="flex gap-4">
                    <InputField
                      placeholder="Nhập email"
                      label={change && 'Email'}
                      isRequired
                      name={'email'}
                      register={register}
                      errors={errors}
                    />
                    <DatePickerField
                      placeholder="Nhập ngày sinh"
                      label={change && 'Ngày sinh'}
                      name={'dob'}
                      isRequired
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <ButtonGroup className="w-full">
                    <Button className="w-full" variant="ghost">
                      Nam
                    </Button>
                    <Button className="w-full" variant="ghost" color="primary">
                      Nữ
                    </Button>
                    <Button className="w-full" variant="ghost">
                      Khác
                    </Button>
                  </ButtonGroup>
                  <Divider />
                  <Button color="primary" onClick={() => setChange(!change)}>
                    {change ? 'Lưu thông tin' : 'Thay đổi'}
                  </Button>
                </CardBody>
              </form>
            </FormProvider>
          </Card>
        </div>
      </div>
    </div>
  );
}
