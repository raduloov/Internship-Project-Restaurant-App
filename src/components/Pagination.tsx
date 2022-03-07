import React from 'react';

const Pagination: React.FC<{
  totalPages: number;
  currentPage: number;
  paginate: (number: number | string) => void;
}> = ({ totalPages, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex">
        <li>
          <button
            onClick={() => paginate('prev')}
            className="flex items-center border-[1px] border-gray-300 px-3 h-10  text-primary hover:bg-gray-300 duration-300"
          >
            <i className="fa-solid fa-chevron-left mr-1"></i>
            Previous
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`border-[1px] border-gray-300 h-10 w-10 text-primary hover:bg-gray-300 duration-300 ${
                number === currentPage && 'bg-gray-300'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate('next')}
            className="flex items-center border-[1px] border-gray-300 px-3 h-10  text-primary hover:bg-gray-300 duration-300"
          >
            Next
            <i className="fa-solid fa-chevron-right ml-1"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
