import React from 'react';

const ProductItem: React.FC<{
  onSelect: (id: string) => void;
  id: string;
  name: string;
  price: number;
}> = ({ onSelect, id, name, price }) => {
  return (
    <div
      onClick={() => onSelect(id)}
      className="flex flex-col flex-wrap items-center justify-center w-[235px] p-5 my-3 mx-3 border-[1px] border-gray-300 shadow-md rounded-md cursor-pointer hover:text-primary hover:scale-105 duration-200"
    >
      <p className="text-2xl font-bold mb-3">{name}</p>
      <p>
        Price: <span className="font-bold">{price.toFixed(2)} BGN</span>
      </p>
    </div>
  );
};

export default ProductItem;
