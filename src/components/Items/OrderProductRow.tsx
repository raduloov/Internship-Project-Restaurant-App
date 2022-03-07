import React from 'react';

const ProductRow: React.FC<
  | {
      name: string;
      quantity: number;
      price: number;
    }
  | any
> = ({ name, quantity, price, totalPrice }) => {
  if (totalPrice) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridTemplateRows: '1fr',
          padding: 5
        }}
        className="odd:bg-gray-100 hover:bg-gray-200 border-t-[1px] border-gray-300"
      >
        <div className="flex items-center"></div>
        <div className="flex items-center"></div>
        <div className="flex items-center justify-end">
          <p className="font-bold">Total</p>
        </div>
        <div className="flex items-center justify-end">
          <p className="font-bold">{totalPrice.toFixed(2)}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr',
        padding: 5
      }}
      className="odd:bg-gray-100 hover:bg-gray-200 border-t-[1px] border-gray-300"
    >
      <div className="flex items-center">
        <p className="pl-2 font-bold">{name}</p>
      </div>
      <div className="flex items-center">
        <p className="font-bold">{quantity}</p>
      </div>
      <div className="flex items-center justify-end">
        <p>{price.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-end">
        <p className="font-bold">{(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductRow;
