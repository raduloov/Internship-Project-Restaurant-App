import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Pagination from '../components/Pagination';
import OrderRow from '../components/Items/OrderRow';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { uiActions } from '../store/ui-slice';
import { apiActions } from '../store/api-slice';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(20);
  const [sortByOrderNumber, setSortByOrderNumber] = useState<string | null>('asc');
  const [sortByTableNumber, setSortByTableNumber] = useState<string | null>(null);
  const [sortByWaiter, setSortByWaiter] = useState<string | null>(null);
  const [sortByDate, setSortByDate] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('All');
  const [selectedTable, setSelectedTable] = useState<string>('all');
  const [enteredWaiterName, setEnteredWaiterName] = useState<string>('');
  const [idToDelete, setIdToDelete] = useState<number>();

  const dispatch = useDispatch();

  const { token, userRole, userName } = useSelector((state: any) => state.auth);
  const { baseUrl, confirmDeleteOrder } = useSelector((state: any) => state.api);

  const confirmDeleteOrderHandler = (orderId: number) => {
    dispatch(uiActions.toggleConfirmDeleteModal('order'));
    setIdToDelete(orderId);
  };

  const getOrders = useCallback(
    async (
      status = '',
      selectedTable = '',
      waiter = '',
      sortBy = '',
      sortDirection = 'Asc'
    ) => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${baseUrl}/orders?${userRole !== 'Admin' ? `UserName=${userName}` : ''}${
            status !== '' && status !== 'All' ? `Status=${status}` : ''
          }${selectedTable !== 'all' ? `&TableId=${selectedTable}` : ''}${
            waiter !== '' ? `&UserName=${waiter}` : ''
          }&Page=${currentPage}&PageSize=${ordersPerPage}${
            sortBy !== '' ? `SortBy=${sortBy}` : ''
          }&SortDirection=${sortDirection}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const data = await res.json();

        setOrders(data.data.items);
        setTotalOrders(data.data.totalCount);
        setIsLoading(false);
      } catch (error) {
        throw error;
      }
    },
    [baseUrl, token, currentPage, ordersPerPage, userRole, userName]
  );

  const getTables = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/tables`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();

      setTables(data);
    } catch (error) {
      throw error;
    }
  }, [baseUrl, token]);

  useEffect(() => {
    getOrders();
    getTables();
  }, [getOrders, getTables]);

  useEffect(() => {
    if (confirmDeleteOrder) {
      const deleteOrder = async () => {
        try {
          await fetch(`${baseUrl}/orders/${idToDelete}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } catch (error) {
          throw error;
        }
      };

      deleteOrder();
      dispatch(apiActions.confirmDeleteOrder());

      // Rerender the users after a brief pause so the new data will have time to be updated
      setTimeout(() => {
        getOrders();
      }, 500);
    }
  }, [baseUrl, confirmDeleteOrder, idToDelete, token, dispatch, getOrders]);

  // SortBy is not working so I can't complete this functionality
  const sortByOrderNumberHandler = () => {
    setSortByTableNumber(null);
    setSortByWaiter(null);
    setSortByDate(null);

    if (sortByOrderNumber === 'asc') {
      setSortByOrderNumber('desc');
      getOrders('', '', '', '', 'desc');
    } else {
      setSortByOrderNumber('asc');
      getOrders();
    }
  };

  const sortByTableNumberHandler = () => {
    setSortByOrderNumber(null);
    setSortByWaiter(null);
    setSortByDate(null);

    if (sortByTableNumber === 'asc') {
      setSortByTableNumber('desc');
    } else {
      setSortByTableNumber('asc');
    }
  };

  const sortByWaiterHandler = () => {
    setSortByOrderNumber(null);
    setSortByTableNumber(null);
    setSortByDate(null);

    if (sortByWaiter === 'asc') {
      setSortByWaiter('desc');
    } else {
      setSortByWaiter('asc');
    }
  };

  const sortByDateHandler = () => {
    setSortByTableNumber(null);
    setSortByOrderNumber(null);
    setSortByWaiter(null);

    if (sortByDate === 'asc') {
      setSortByDate('desc');
    } else {
      setSortByDate('asc');
    }
  };

  // Change page
  const paginate = (pageNumber: number | string) => {
    if (typeof pageNumber === 'number') {
      setCurrentPage(pageNumber);
      getOrders();
    } else if (pageNumber === 'prev' && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    } else if (
      pageNumber === 'next' &&
      currentPage < Math.ceil(totalOrders / ordersPerPage)
    ) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Card title="Orders" className="w-[1350px]">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col w-full pr-5">
          <label htmlFor="waiter-name">Waiter</label>
          <Input
            type="text"
            id="waiter-name"
            placeholder="Waiter name"
            className="mt-2"
            onChange={(event: any) => setEnteredWaiterName(event.target.value)}
            value={enteredWaiterName}
          />
        </div>
        <div className="flex flex-col w-full pr-5">
          <label htmlFor="table">Table</label>
          <select
            id="table"
            className="border-2 border-gray-300 rounded-md p-1 outline-primary mt-2"
            onChange={event => setSelectedTable(event.target.value)}
            value={selectedTable}
          >
            <option value="all">All</option>
            {tables.map((table: any) => (
              <option value={table.id} key={table.id}>
                Table {table.number}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full pr-5">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="border-2 border-gray-300 rounded-md p-1 outline-primary mt-2"
            onChange={event => setStatus(event.target.value)}
            value={status}
          >
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
        <div className="flex items-end w-full">
          <Button
            onClick={() => getOrders(status, selectedTable, enteredWaiterName)}
            className="text-primary border-primary hover:bg-primary mt-4 h-10"
          >
            <i className="fa-solid fa-filter"></i> Filter
          </Button>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1.5fr 1fr 1fr 1.5fr',
          gridTemplateRows: '1fr',
          borderBottom: '1px solid black',
          padding: 5
        }}
      >
        <div>
          <button onClick={sortByOrderNumberHandler} className="font-bold pl-2">
            Order #{' '}
            {sortByOrderNumber ? (
              sortByOrderNumber === 'asc' ? (
                <i className="fa-solid fa-sort-up"></i>
              ) : (
                <i className="fa-solid fa-sort-down"></i>
              )
            ) : (
              <i className="fa-solid fa-sort"></i>
            )}
          </button>
        </div>
        <div>
          <button onClick={sortByTableNumberHandler} className="font-bold">
            Table #{' '}
            {sortByTableNumber ? (
              sortByTableNumber === 'asc' ? (
                <i className="fa-solid fa-sort-up"></i>
              ) : (
                <i className="fa-solid fa-sort-down"></i>
              )
            ) : (
              <i className="fa-solid fa-sort"></i>
            )}
          </button>
        </div>
        <div>
          <button onClick={sortByWaiterHandler} className="font-bold">
            Waiter{' '}
            {sortByWaiter ? (
              sortByWaiter === 'asc' ? (
                <i className="fa-solid fa-sort-up"></i>
              ) : (
                <i className="fa-solid fa-sort-down"></i>
              )
            ) : (
              <i className="fa-solid fa-sort"></i>
            )}
          </button>
        </div>
        <div>
          <button onClick={sortByDateHandler} className="font-bold">
            Date{' '}
            {sortByDate ? (
              sortByDate === 'asc' ? (
                <i className="fa-solid fa-sort-up"></i>
              ) : (
                <i className="fa-solid fa-sort-down"></i>
              )
            ) : (
              <i className="fa-solid fa-sort"></i>
            )}
          </button>
        </div>
        <div>
          <p className="font-bold">Status</p>
        </div>
        <div>
          <p className="font-bold">Price</p>
        </div>
      </div>
      <div className="border-b-2 border-gray-200 mb-5">
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          orders.map((order: any) => (
            <OrderRow
              onDelete={confirmDeleteOrderHandler}
              orderId={order.id}
              userRole={userRole}
              tableNumber={order.tableNumber}
              tableId={order.tableId}
              waiter={order.userName}
              date={order.createdAt}
              status={order.status}
              price={order.totalPrice}
              key={order.id}
            />
          ))}
      </div>
      <Pagination
        totalPages={Math.ceil(totalOrders / ordersPerPage)}
        currentPage={currentPage}
        paginate={paginate}
      />
    </Card>
  );
};

export default Orders;
