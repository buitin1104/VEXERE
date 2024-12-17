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
}) => {
  const { register, formState, watch } = useFormContext();
  const error = formState.errors?.[name]?.message;
  return (
    <div className="flex flex-col w-full">
      <Select
        placeholder={placeholder}
        label={label}
        className={`w-full bg-transparent ${className}`}
        color={error ? 'danger' : 'default'}
        errorMessage={error}
        selectedKeys={watch(name) ? [watch(name)] : []}
        {...register(name, validate)}
      >
        {options.map((option) => (
          <SelectItem key={option.id || option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      {error && <p className="text-red text-sm">{error}</p>}
    </div>
  );
};

export default SelectField;
