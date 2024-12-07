import { Input } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const InputField = ({
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
      <Input
        type={type}
        placeholder={placeholder}
        className={`w-full min-w-72 bg-transparent ${className}`}
        color={errors?.[name] ? 'danger' : 'default'}
        errorMessage={errors?.[name] && 'Bắt buộc nhập thông tin'}
        value={watch(name) ? watch(name) : undefined}
        {...register(name)}
        {...props}
      />
    </>
  );
};

export default InputField;
