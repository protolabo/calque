import React, { ChangeEvent, ReactNode, useContext } from 'react';
import { GraphContext } from './Layout';
import { getNode, NodeState, EdgeState } from '../models/State';

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

const Editor = (props: {children: ReactNode}) => {
  return (
    <div className='mx-auto p-8 mt-2'>
      <h2 className='font-bold'>Properties of :</h2>
      {props.children}
    </div>    
  )
}

export type { InputFieldProps }
export { InputField, Editor }