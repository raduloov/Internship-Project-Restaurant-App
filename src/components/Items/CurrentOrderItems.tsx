import React from 'react';

import Button from '../UI/Button';
import ProductItemSmall from './ProductItemSmall';
import LoadingSpinner from '../UI/LoadingSpinner';

const CurrentOrderItems: React.FC<{
  isLoading: boolean;
  selectedProducts: any[];
  onSaveOrder: () => void;
  onDeleteProduct: (productId: number) => void;
  onCompleteOrder: () => void;
  onDiscardOrder: () => void;
}> = ({
  isLoading,
  selectedProducts,
  onSaveOrder,
  onDeleteProduct,
  onCompleteOrder,
  onDiscardOrder
}) => {
  return (
    <div className="border-[1px] border-gray-300 bg-gray-100 rounded-md">
      <div className="p-2 border-[1px] border-b-gray-300">
        <p className="text-xl">Current order</p>
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading &&
        selectedProducts.length > 0 &&
        selectedProducts.map((product: any) => (
          <ProductItemSmall
            onDelete={() => onDeleteProduct(product.id)}
            productId={product.id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            key={product.id}
          />
        ))}
      <div className="flex justify-between items-center p-2 border-[1px] border-b-gray-300">
        <p>Total:</p>
        {/* totalPrice is hardcoded since the API does not return such property */}
        <p className="font-bold">43.50 BGN</p>
      </div>
      <div className="flex flex-col p-4 text-xl">
        <div className="flex justify-between mb-2">
          <Button
            onClick={onSaveOrder}
            className="text-primary border-primary hover:bg-primary w-full mr-3"
          >
            Save
          </Button>
          <Button
            onClick={onDiscardOrder}
            className="w-full ml-3 border-[#dc2626] text-[#dc2626]
                 hover:bg-[#dc2626]
                "
          >
            Discard
          </Button>
        </div>
        <Button
          onClick={onCompleteOrder}
          className="bg-primary text-white hover:bg-blue-700"
        >
          Complete
        </Button>
      </div>
    </div>
  );
};

export default CurrentOrderItems;
