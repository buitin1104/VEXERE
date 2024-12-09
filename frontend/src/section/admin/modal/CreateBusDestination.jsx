import InputField from '@components/common/InputField';
import SelectField from '@components/common/SelectField';
import { Button } from '@nextui-org/react';
import { PROVINCES } from '@utils/constants';
import { ToastInfo, ToastNotiError } from '@utils/Utils';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useModalCommon } from '../../../context/ModalContext';
import { factories } from '../../../factory';

export default function CreateBusDestinationModal({ onReload }) {
  const [isLoading, setIsLoading] = useState(false);
  const { onClose } = useModalCommon();
  const methods = useForm();
  const { register, errors, watch } = methods;

  async function handleSave(values) {
    setIsLoading(true);
    let data = {
      name: values.name,
      city: values.city,
      coordinates: [values.lat, values.lng],
    };
    factories
      .createNewLocation(data)
      .then(() => {
        ToastInfo('Tạo mới thành công');
        onClose();
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
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-scroll">
            <InputField
              placeholder="Tên điểm đến"
              label="Tên điểm đến"
              name={'name'}
              isRequired
              validate={{ required: 'Bắt buộc chọn' }}
            />
            <SelectField
              options={PROVINCES || []}
              placeholder="Tên thành phố"
              label="Tên thành phố"
              name={'city'}
              isRequired
              validate={{ required: 'Bắt buộc chọn' }}
            />
            <InputField
              placeholder="Kinh độ"
              label="Kinh độ"
              name={'lat'}
              isRequired
              validate={{ required: 'Bắt buộc chọn' }}
            />
            <InputField
              placeholder="Vĩ độ"
              label="Vĩ độ"
              name={'lng'}
              isRequired
              validate={{ required: 'Bắt buộc chọn' }}
            />
          </div>
          <Button isLoading={isLoading} type="submit">
            Tạo mới điểm đón / trả
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
