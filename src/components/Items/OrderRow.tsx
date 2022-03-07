import React from 'react';

import OrderActionsDropdown from '../Dropdowns/OrderActionsDropdown';

const OrderRow: React.FC<{
  onDelete: (orderId: number) => void;
  userRole: string;
  orderId: number;
  tableId: number;
  tableNumber: number;
  waiter: string;
  date: string;
  status: string;
  price: number;
}> = ({
  onDelete,
  userRole,
  orderId,
  tableId,
  tableNumber,
  waiter,
  date,
  status,
  price
}) => {
  const getFormattedDate = (date: any) => {
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
  };

  const formattedDate = getFormattedDate(new Date(date));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1.5fr 1fr 1fr 1.5fr',
        gridTemplateRows: '1fr',
        padding: 5
      }}
      className="odd:bg-gray-100 hover:bg-gray-200 border-t-[1px] border-gray-300"
    >
      <div className="flex items-center">
        <p className="pl-2 font-bold">{orderId}</p>
      </div>
      <div className="flex items-center">
        <p className="font-bold">{tableNumber}</p>
      </div>
      <div className="flex items-center">
        <p>{waiter}</p>
      </div>
      <div className="flex items-center">
        <p>{formattedDate}</p>
      </div>
      <div className="flex items-center">
        <p>{status}</p>
      </div>
      <div className="flex items-center">
        <p>{price.toFixed(2)} BGN</p>
      </div>
      <div>
        <OrderActionsDropdown
          orderId={orderId}
          tableId={tableId}
          userRole={userRole}
          status={status}
          onDelete={() => onDelete(orderId)}
        />
      </div>
    </div>
  );
};

export default OrderRow;
