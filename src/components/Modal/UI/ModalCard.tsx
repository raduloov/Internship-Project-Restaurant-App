import React from 'react';

import Button from '../../UI/Button';

const ModalCard: React.FC<
  | {
      className: string;
      confirmLabel: string;
      declineLabel: string;
      onConfirm: () => void;
      onDecline: () => void;
      onClose: () => void;
    }
  | any
> = props => {
  return (
    <div
      className={`border-2 border-gray-200 rounded-md flex flex-col p-4 text-gray-800 bg-white shadow-md ${props.className}`}
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={props.onClose}
          className="text-2xl text-gray-500 hover:text-black"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="px-8">{props.children}</div>
      <div className="flex justify-end mt-5">
        {props.confirmLabel && (
          <Button
            onClick={props.onConfirm}
            className="text-primary border-primary hover:bg-primary mx-2 w-16"
          >
            {props.confirmLabel}
          </Button>
        )}
        {props.declineLabel && (
          <Button
            onClick={props.onDecline}
            className="border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] mx-2 w-16"
          >
            {props.declineLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModalCard;
