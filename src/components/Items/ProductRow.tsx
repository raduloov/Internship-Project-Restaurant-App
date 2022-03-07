import React from 'react';

import ProductActionsDropdown from '../Dropdowns/ProductActionsDropdown';

const ProductRow: React.FC<{
  name: string;
  category: string;
  price: number;
  productId: string;
  onDelete: (productId: string) => void;
}> = ({ name, category, price, productId, onDelete }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 2fr 2fr',
        gridTemplateRows: '1fr',
        padding: 5
      }}
      className="odd:bg-gray-100 hover:bg-gray-200 border-t-[1px] border-gray-300"
    >
      <div className="flex items-center">
        <p className="pl-2">{name}</p>
      </div>
      <div className="flex items-center">
        <p>{category}</p>
      </div>
      <div className="flex items-center justify-end">
        <p className="font-bold">{price.toFixed(2)}</p>
      </div>
      <div>
        <ProductActionsDropdown
          productId={productId}
          onDelete={() => onDelete(productId)}
        />
      </div>
    </div>
  );
};

export default ProductRow;
