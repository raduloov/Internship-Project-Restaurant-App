import React from 'react';

import { Link } from 'react-router-dom';

const Table: React.FC<{
  tableId: string;
  status: string;
  capacity: number;
  number: number;
  waiter: string;
  price: number;
}> = ({ tableId, status, capacity, number, waiter, price }) => {
  return (
    <Link
      to={`/tables/manage-table/${tableId}`}
      className="border-[1px] border-gray-300 rounded-md w-[300px] my-2 shadow-md cursor-pointer hover:text-primary hover:scale-105 duration-300"
    >
      <div className="flex bg-gray-200 px-3 py-2 justify-between items-center border-b-[1px] border-gray-300">
        <div
          className={`${
            status === 'Active' ? 'bg-primary' : 'bg-gray-500'
          } text-white text-sm p-1 rounded-xl`}
        >
          {status}
        </div>
        <p>Capacity: {capacity}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-4xl font-bold ml-auto mr-auto mt-5 mb-5">#{number}</p>
        <div className="flex flex-col items-center mb-4">
          <p>
            Waiter: <span className="font-bold">{waiter ? waiter : 'N/A'}</span>
          </p>
          <p>
            Total:{' '}
            <span className="font-bold">{price ? price.toFixed(2) : 0} BGN</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Table;
