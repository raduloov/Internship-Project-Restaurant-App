import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavDropdown from '../components/Dropdowns/NavDropdown';
import UserDropdown from '../components/Dropdowns/UserDropdown';

const Navbar = () => {
  const { isLoggedIn, userRole } = useSelector((state: any) => state.auth);

  return (
    <nav className="bg-primary flex w-full p-3 shadow-md mb-16">
      <div className="flex mr-auto ml-auto max-w-[1300px] justify-between items-center w-full">
        <div className="flex">
          <Link to="/tables" className="text-2xl text-white">
            MentorMate
          </Link>
          {isLoggedIn && (
            <div className="flex items-center ml-3 w-full">
              <ul className="flex text-gray-300 mr-auto md:hidden">
                <li className="mr-2 ml-2 hover:text-white cursor-pointer duration-300">
                  <NavLink
                    className={(navData: any) =>
                      navData.isActive ? 'text-white' : ''
                    }
                    to="/tables"
                  >
                    Tables
                  </NavLink>
                </li>
                <li className="mr-2 ml-2 hover:text-white cursor-pointer duration-300">
                  <NavLink
                    className={(navData: any) =>
                      navData.isActive ? 'text-white' : ''
                    }
                    to="/orders"
                  >
                    Orders
                  </NavLink>
                </li>
                {userRole === 'Admin' && (
                  <>
                    <li className="mr-2 ml-2 hover:text-white cursor-pointer duration-300">
                      <NavLink
                        className={(navData: any) =>
                          navData.isActive ? 'text-white' : ''
                        }
                        to="/products"
                      >
                        Products
                      </NavLink>
                    </li>
                    <li className="mr-2 ml-2 hover:text-white cursor-pointer duration-300">
                      <NavLink
                        className={(navData: any) =>
                          navData.isActive ? 'text-white' : ''
                        }
                        to="/categories"
                      >
                        Categories
                      </NavLink>
                    </li>
                    <li className="mr-2 ml-2 hover:text-white cursor-pointer duration-300">
                      <NavLink
                        className={(navData: any) =>
                          navData.isActive ? 'text-white' : ''
                        }
                        to="/users"
                      >
                        Users
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
        {isLoggedIn && (
          <div className="flex">
            <UserDropdown />
            <div className="md-min:hidden">
              <NavDropdown />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
