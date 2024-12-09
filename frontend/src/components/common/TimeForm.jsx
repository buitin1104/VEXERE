import { TimeInput } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const TimeForm = ({
  name,
  options,
  label,
  placeholder = '',
  className = '',
  validate = {},
  ...props
}) => {
  const { register, formState } = useFormContext();
  const error = formState.errors?.[name]?.message;
  return (
    <div className="flex flex-col w-full">
      <TimeInput
        placeholder={placeholder}
        label={label}
        className={`w-full bg-transparent ${className}`}
        color={error ? 'danger' : 'default'}
        errorMessage={error}
        onChange={(e) => console.log(e)}
        // {...register(name, validate)}
      />
      {error && <p className="text-red text-sm">{error}</p>}
    </div>
  );
};

export default TimeForm;
