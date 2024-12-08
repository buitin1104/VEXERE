import { Input } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const InputField = ({
  type = 'text',
  placeholder = '',
  name,
  label,
  validate = {},
  className = '',
  ...props
}) => {
  const { register, formState } = useFormContext();
  const error = formState.errors?.[name]?.message;

  return (
    <div className="flex flex-col">
      <Input
        type={type}
        label={label}
        placeholder={placeholder}
        className={`w-full bg-transparent ${className}`}
        color={error ? 'danger' : 'default'}
        errorMessage={error}
        {...register(name, validate)}
        {...props}
      />
      {error && <p className="text-red text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
