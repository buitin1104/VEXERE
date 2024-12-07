import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
} from '@nextui-org/react';
import { default as React } from 'react';
import { FormProvider } from 'react-hook-form';
import DatePickerField from '../../components/common/DatePickerField';
import Sidebar from '../../components/sidebar/SideBar';

export default function MyTicketPage() {
  return (
    <div className="mx-auto my-20 flex justify-center">
      <div className="flex w-full max-w-[60%] gap-6">
        <div className="w-fit">
          <Sidebar active="1" />
        </div>
        <div className="flex flex-grow">
          <Card className="w-full">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSave)}>
                <CardBody className="w-full gap-4">
                  <div className="flex flex-row justify-between p-2">
                    <h5 className="text-2xl font-bold">Thông tin cá nhân</h5>
                    <div className="relative h-16 w-16 cursor-pointer">
                      <Avatar
                        showFallback
                        src={watch('profilePictureUrl')}
                        className="h-14 w-14 rounded-full"
                      />
                      <div className="absolute bottom-1 right-1">
                        <i class="fa fa-camera" aria-hidden="true"></i>
                      </div>
                      <input
                        type="file"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <InputField
                      label={'Họ và tên'}
                      placeholder="Nhập họ và tên"
                      name={'fullName'}
                      register={register}
                      isRequired
                      errors={errors}
                    />
                    <InputField
                      placeholder="Nhập số điện thoại"
                      label={'Số điện thoại'}
                      name={'phone'}
                      isRequired
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="flex gap-4">
                    <InputField
                      placeholder="Nhập email"
                      label={'Email'}
                      isRequired
                      name={'email'}
                      register={register}
                      errors={errors}
                    />
                    <DatePickerField
                      placeholder="Nhập ngày sinh"
                      label={'Ngày sinh'}
                      name={'dob'}
                      isRequired
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <ButtonGroup className="w-full">
                    <Button
                      className="w-full"
                      variant="solid"
                      color={watch('gender') === 1 ? 'primary' : 'default'}
                      onClick={() => setValue('gender', 1)}
                    >
                      Nam
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => setValue('gender', 2)}
                      variant="solid"
                      color={watch('gender') === 2 ? 'primary' : 'default'}
                    >
                      Nữ
                    </Button>
                    <Button
                      onClick={() => setValue('gender', 3)}
                      color={watch('gender') === 3 ? 'primary' : 'default'}
                      className="w-full"
                      variant="solid"
                    >
                      Khác
                    </Button>
                  </ButtonGroup>
                  <Divider />
                  <Button color="primary" type="submit" isLoading={loading}>
                    {'Lưu thông tin'}
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
