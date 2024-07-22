import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
    type?: 'text' | 'number' | 'color';
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text' }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (type === 'number') {
      onChange(parseInt(inputValue));
    } else {
      onChange(inputValue);
    }
  };

  return (
    <div className='p-2 flex gap-4'>
      <label>{label}</label>
      <input type={type} value={value} onChange={handleChange} />
    </div>
  );
};

export type { InputFieldProps }
export { InputField }