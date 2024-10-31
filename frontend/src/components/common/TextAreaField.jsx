import { Textarea } from '@nextui-org/react';
import React from 'react';

const TextAreaField = ({
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
      <Textarea
        placeholder={placeholder}
        className={` w-full bg-transparent ${className}`}
        {...register(name)}
        {...props}
      />
      {errors[name] && (
        <span className="text-red">Bắt buộc nhập thông tin</span>
      )}
    </>
  );
};

export default TextAreaField;
