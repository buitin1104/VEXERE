import React from 'react';

const SelectField = ({
  name,
  options,
  register,
  errors,
  placeholder = '',
  className = '',
  ...props
}) => {
  return (
    <>
      <select
        className={`w-full border border-slate-200 rounded-lg py-3 px-3 outline-none bg-transparent ${className}`}
        {...register(name)}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red">Bắt buộc nhập thông tin</span>
      )}
    </>
  );
};

export default SelectField;
