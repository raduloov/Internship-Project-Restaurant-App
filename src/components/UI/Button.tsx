import React from 'react';

const Button: React.FC<{ className: string; onClick: () => void } | any> = props => {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} border-2 p-2 rounded-md hover:text-white duration-300 shadow-md`}
    >
      {props.children}
    </button>
  );
};

export default Button;
