import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const SelectField = ({
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
    <div className="flex flex-col ">
      <Select
        placeholder={placeholder}
        label={label}
        className={`w-full bg-transparent ${className}`}
        color={error ? 'danger' : 'default'}
        errorMessage={error}
        {...register(name, validate)}
      >
        {options.map((option) => (
          <SelectItem key={option.id}>{option.label}</SelectItem>
        ))}
      </Select>
      {error && <p className="text-red text-sm">{error}</p>}
    </div>
  );
};

export default SelectField;
