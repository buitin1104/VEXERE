import InputField from '@components/common/InputField';
import SelectField from '@components/common/SelectField';
import UploadImages from '@components/common/UploadImage';
import { Button } from '@nextui-org/react';
import { BUSES_LIST } from '@utils/constants';
import { ToastInfo, ToastNotiError, uploadFirebase } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import { useModalCommon } from '../../../context/ModalContext';
import { factories } from '../../../factory';

export default function CreateBusModal({ onReload, item }) {
  console.log('🚀 ~ CreateBusModal ~ item:', item);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const { onClose } = useModalCommon();
  const methods = useForm();
  const { register, errors, setValue, watch } = methods;

  useEffect(() => {
    if (item) {
      setValue('busModel', item.busModel);
      setValue('busNumber', item.busNumber);
      if (item.gallery.length > 0) {
        const newList = item.gallery.map((image) => ({
          url: image,
          file: null,
        }));
        setValue('busImage', newList);
      }
    }
  }, [item]);
  async function handleSave(values) {
    setIsLoading(true);
    let data = {
      owner: auth._id,
      busModel: values.busModel,
      busNumber: values.busNumber,
    };
    const newUrls = [];
    for (const image of values?.busImage) {
      if (!image.file) continue;
      const newUrl = await uploadFirebase(image.file);
      newUrls.push(newUrl);
    }
    data.gallery = newUrls;
    if (item?._id) {
      factories
        .editBus(data, item._id)
        .then(() => {
          ToastInfo('Cập nhật xe thành công');
          onClose();
          onReload();
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response?.data?.message) {
            ToastNotiError(err.response?.data?.message);
          }
          setIsLoading(false);
        });
      return;
    }
    factories
      .createNewBus(data)
      .then(() => {
        ToastInfo('Tạo mới xe thành công');
        onClose();
        onReload();
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          ToastNotiError(err.response?.data?.message);
        }
        setIsLoading(false);
      });
  }

  return (
    <div className="p-5 pt-0 flex flex-col gap-4">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSave)}
          className="flex flex-col gap-4"
        >
          <InputField
            placeholder="Nhập biển số xe"
            label="Biển số xe"
            name={'busNumber'}
            isRequired
            register={register}
            errors={errors}
            validate={{ required: 'Bắt buộc nhập biển số xe' }}
          />
          <SelectField
            options={BUSES_LIST || []}
            placeholder="Loại xe"
            label="Loại xe"
            name={'busModel'}
            isRequired
            errors={errors}
            validate={{ required: 'Bắt buộc nhập biển số xe' }}
          />
          <UploadImages label="Hình ảnh xe" name={'busImage'} />
          <Button isLoading={isLoading} type="submit">
            {item ? 'Cập nhật thông tin' : 'Tạo mới xe'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
