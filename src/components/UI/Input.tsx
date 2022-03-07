import React from 'react';

const Input: React.FC<
  | {
      type: string;
      id: string;
      className: string;
      value: string;
      placeholder: string;
      required: boolean;
      maxLength: string;
      readonly: boolean;
      min: number;
      max: number;
      defaultValue: string;
      onChange: () => void;
    }
  | any
> = props => {
  return (
    <input
      type={props.type}
      id={props.id}
      className={`border-2 border-gray-300 rounded-md p-1 focus:border-primary outline-none duration-300 ${props.className}`}
      value={props.value}
      placeholder={props.placeholder}
      required={props.required}
      maxLength={props.maxLength}
      readOnly={props.readOnly}
      onChange={props.onChange}
      min={props.min}
      max={props.max}
      defaultValue={props.defaultValue}
    />
  );
};

export default Input;
