import { DatePicker } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const DatePickerField = ({
  type = 'text',
  placeholder = '',
  name,
  register,
  errors,
  className = '',
  ...props
}) => {
  const { watch } = useFormContext();

  return (
    <>
      <DatePicker
        type={type}
        placeholder={placeholder}
        className={`min-w-72 w-full  bg-transparent ${className}`}
        color={errors?.[name] ? 'danger' : 'default'}
        errorMessage={errors?.[name] && 'Bắt buộc nhập thông tin'}
        {...register(name)}
        {...props}
      />
    </>
  );
};

export default DatePickerField;
