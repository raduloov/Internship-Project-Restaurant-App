import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const UserDropdown: React.FC = () => {
  const dispatch = useDispatch();

  const { userPicture, userName } = useSelector((state: any) => state.auth);

  const logoutHandler = () => {
    dispatch(authActions.logoutUser());
  };

  return (
    <div className="text-right relative">
      <Menu as="div">
        <Menu.Button className="flex items-center py-2 text-gray-300 hover:text-white duration-300">
          <div>
            {userPicture ? (
              <img src={userPicture} alt="User" />
            ) : (
              <i className="fa-regular fa-user"></i>
            )}
          </div>
          <p className="ml-2 mr-2">{userName}</p>
          <i className="fa-solid fa-chevron-down"></i>
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
          <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/profile"
                    className={`${
                      active ? 'bg-primary text-white' : 'text-black'
                    } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                  >
                    <div className="flex">
                      <i className="fa-regular fa-circle-user"></i>
                    </div>
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/login"
                    onClick={logoutHandler}
                    className={`${
                      active ? 'bg-primary text-white' : 'text-black'
                    } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                  >
                    <div className="flex">
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </div>
                    Log out
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserDropdown;
