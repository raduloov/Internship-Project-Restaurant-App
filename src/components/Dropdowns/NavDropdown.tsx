import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavDropdown: React.FC = props => {
  const userRole = useSelector((state: any) => state.auth.userRole);

  return (
    <div className="text-right relative">
      <Menu as="div">
        <Menu.Button className="flex items-center py-2 text-2xl text-gray-300 hover:text-white duration-300">
          <i className="fa-solid fa-bars px-4"></i>
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
          <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right z-10 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/tables"
                    className={`${
                      active ? 'bg-primary text-white' : 'text-black'
                    } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                  >
                    <div className="flex">
                      <i className="fa-solid fa-table"></i>
                    </div>
                    Tables
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/orders"
                    className={`${
                      active ? 'bg-primary text-white' : 'text-black'
                    } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                  >
                    <div className="flex">
                      <i className="fa-solid fa-coins"></i>
                    </div>
                    Orders
                  </Link>
                )}
              </Menu.Item>
              {userRole === 'Admin' && (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/products"
                        className={`${
                          active ? 'bg-primary text-white' : 'text-black'
                        } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                      >
                        <div className="flex">
                          <i className="fa-solid fa-carrot"></i>
                        </div>
                        Products
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/categories"
                        className={`${
                          active ? 'bg-primary text-white' : 'text-black'
                        } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                      >
                        <div className="flex">
                          <i className="fa-solid fa-folder-tree"></i>
                        </div>
                        Categories
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/users"
                        className={`${
                          active ? 'bg-primary text-white' : 'text-black'
                        } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                      >
                        <div className="flex">
                          <i className="fa-solid fa-users"></i>
                        </div>
                        Users
                      </Link>
                    )}
                  </Menu.Item>
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default NavDropdown;
