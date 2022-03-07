import { useState } from 'react';

import Input from '../UI/Input';

const ProductItemSmall: React.FC<{
  onDelete: (productId: number) => void;
  productId: number;
  name: string;
  price: number;
  quantity: number;
}> = props => {
  const [quantity, setQuantity] = useState<number>(props.quantity);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        gridTemplateRows: '1fr'
      }}
      className="p-2 border-[1px] border-b-gray-300"
    >
      <p>{props.name}</p>
      <div className="flex justify-end">
        <Input
          type="number"
          className="w-1/4 mr-5"
          min={1}
          onChange={(event: any) => setQuantity(event.target.value)}
          value={quantity}
        />
      </div>
      <div className="flex justify-end items-center">
        <p>{(quantity * props.price).toFixed(2)} BGN</p>
        <button onClick={() => props.onDelete(props.productId)}>
          <i className="fa-solid fa-trash ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductItemSmall;
