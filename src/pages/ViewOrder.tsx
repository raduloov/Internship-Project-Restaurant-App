import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Card from '../components/UI/Card';
import OrderProductRow from '../components/Items/OrderProductRow';

// Using dummy data here since the API doesn't return a products property nor a totalPrice property
const dummy_data = {
  id: 5,
  userId: 26,
  userName: 'Martin Georgiev',
  status: 'Active',
  totalPrice: 100,
  products: [
    {
      id: 31,
      name: '31231',
      quantity: 5,
      price: 13
    },
    {
      id: 5,
      name: 'Coke',
      quantity: 4,
      price: 3
    },
    {
      id: 1,
      name: 'Cucumber',
      quantity: 8,
      price: 2
    },
    {
      id: 16,
      name: 'Duck',
      quantity: 1,
      price: 11
    },
    {
      id: 12,
      name: 'Fanta',
      quantity: 5,
      price: 3
    },
    {
      id: 21,
      name: 'Fish',
      quantity: 3,
      price: 9
    }
  ]
};

const ViewOrder = () => {
  const [orderInfo, setOrderInfo] = useState<any>({});

  const { orderId } = useParams();

  const { baseUrl } = useSelector((state: any) => state.api);
  const { token } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const getOrderInfo = async () => {
      try {
        const response = await fetch(`${baseUrl}/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        setOrderInfo(data.data);
      } catch (error) {
        throw error;
      }
    };

    getOrderInfo();
  }, [baseUrl, token, orderId]);

  return (
    <div className="flex flex-col">
      <div className="text-gray-500 mb-3">
        <p>
          <Link to="/orders" className="text-primary underline-offset-2 underline">
            Orders
          </Link>{' '}
          / Order details
        </p>
      </div>
      <Card
        title={
          <div className="flex">
            <p>Order #{orderInfo.id}</p>
            <div
              className={`${
                orderInfo.status === 'Active' ? 'bg-primary' : 'bg-gray-500'
              } ml-2 flex items-center text-white px-2 text-2xl rounded-3xl`}
            >
              {orderInfo.status}
            </div>
          </div>
        }
        className="w-[1300px]"
      >
        <div className="flex border-[1px] border-gray-300 rounded-md bg-gray-100 p-5">
          <div className="w-1/2">
            <p>Table</p>
            <p className="font-bold my-4">Table 1</p>
          </div>
          <div className="w-1/2">
            <p>Waiter</p>
            <p className="font-bold my-4">{orderInfo.userName}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-2xl">Products</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gridTemplateRows: '1fr',
              borderBottom: '1px solid black',
              padding: 5,
              marginTop: 10
            }}
          >
            <div>
              <p className="font-bold pl-2">Name</p>
            </div>
            <div>
              <p className="font-bold">Quantity</p>
            </div>
            <div className="flex justify-end">
              <p className="font-bold">Price</p>
            </div>
            <div className="flex justify-end">
              <p className="font-bold">Total Price</p>
            </div>
          </div>
          {dummy_data.products.map((product: any) => (
            <OrderProductRow
              name={product.name}
              quantity={product.quantity}
              price={product.price}
              key={product.id}
            />
          ))}
          <OrderProductRow totalPrice={dummy_data.totalPrice} />
        </div>
      </Card>
    </div>
  );
};

export default ViewOrder;
