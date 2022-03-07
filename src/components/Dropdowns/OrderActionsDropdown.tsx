import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

const OrderActionsDropdown: React.FC<{
  orderId: number;
  tableId: number;
  userRole: string;
  status: string;
  onDelete: () => void;
}> = ({ orderId, tableId, userRole, status, onDelete }) => {
  return (
    <div className="text-right relative">
      <Menu as="div" className="flex justify-end">
        <Menu.Button className="flex items-center py-2 text-gray-600duration-300">
          <div className="flex items-center text-gray-600 border-2 border-gray-600 px-2 py-1 rounded-md hover:bg-gray-600 hover:text-white duration-300 shadow-md">
            <p className="mr-2">Actions</p>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute top-[52px] w-28 origin-top-right bg-white z-10 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              {status === 'Active' ? (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={`/orders/manage-order/${orderId}`}
                      className={`${
                        active ? 'bg-gray-600 text-white' : 'text-black'
                      } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                    >
                      <div className="flex">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </div>
                      Edit
                    </Link>
                  )}
                </Menu.Item>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={`/orders/${orderId}`}
                      className={`${
                        active ? 'bg-gray-600 text-white' : 'text-black'
                      } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                    >
                      <div className="flex">
                        <i className="fa-solid fa-eye"></i>
                      </div>
                      View
                    </Link>
                  )}
                </Menu.Item>
              )}
              {userRole === 'Admin' && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onDelete}
                      className={`${
                        active ? 'bg-gray-600 text-white' : 'text-black'
                      } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                    >
                      <div className="flex">
                        <i className="fa-solid fa-trash"></i>
                      </div>
                      Delete
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default OrderActionsDropdown;
