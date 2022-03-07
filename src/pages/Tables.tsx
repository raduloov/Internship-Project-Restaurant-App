import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Card from '../components/UI/Card';
import Table from '../components/Items/Table';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { baseUrl } = useSelector((state: any) => state.api);
  const { token } = useSelector((state: any) => state.auth);

  const getTables = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/tables`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();

      setTables(data);
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  }, [baseUrl, token]);

  useEffect(() => {
    getTables();
  }, [getTables]);

  return (
    <Card title="Tables" className="border-0 shadow-none">
      <div className="flex flex-wrap justify-evenly">
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          tables.map((table: any) => (
            <Table
              tableId={table.id}
              status={table.status}
              capacity={table.capacity}
              number={table.number}
              waiter={table.userName}
              price={table.totalPrice}
              key={table.id}
            />
          ))}
      </div>
    </Card>
  );
};

export default Tables;
