import { Input } from '@nextui-org/react';
import React from 'react';

const InputField = ({
  type = 'text',
  placeholder = '',
  name,
  register,
  errors,
  className = '',
  ...props
}) => {
  return (
    <>
      <Input
        type={type}
        placeholder={placeholder}
        className={`min-w-72 w-full  bg-transparent ${className}`}
        {...register(name)}
        {...props}
      />
      {errors[name] && (
        <span className="text-red">Bắt buộc nhập thông tin</span>
      )}
    </>
  );
};

export default InputField;
