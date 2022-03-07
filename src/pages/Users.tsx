import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../components/UI/Card';
import Pagination from '../components/Pagination';
import UserRow from '../components/Items/UserRow';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { uiActions } from '../store/ui-slice';
import { apiActions } from '../store/api-slice';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [idToDelete, setIdToDelete] = useState<string>('');

  const dispatch = useDispatch();

  const { baseUrl, confirmDeleteUser } = useSelector((state: any) => state.api);
  const { token } = useSelector((state: any) => state.auth);

  const confirmDeleteUserHandler = (userId: string) => {
    dispatch(uiActions.toggleConfirmDeleteModal('user'));
    setIdToDelete(userId);
  };

  const getUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${baseUrl}/users?Page=${currentPage}&PageSize=20&SortDirection=Asc`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = await res.json();

      setUsers(data.items);
      setTotalUsers(data.totalCount);
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  }, [baseUrl, token, currentPage]);

  useEffect(() => {
    if (confirmDeleteUser) {
      const deleteUser = async () => {
        try {
          await fetch(`${baseUrl}/users/${idToDelete}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } catch (error) {
          throw error;
        }
      };

      deleteUser();
      dispatch(apiActions.confirmDelete('user'));

      // Rerender the users after a brief pause so the new data will have time to be updated
      setTimeout(() => {
        getUsers();
      }, 500);
    }
  }, [baseUrl, confirmDeleteUser, idToDelete, token, dispatch, getUsers]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Pagination doesn't work as expected since API returns totalCount as the
  // last ID created and not the length of the users array
  // Change page
  const paginate = (pageNumber: number | string) => {
    if (typeof pageNumber === 'number') {
      setCurrentPage(pageNumber);
      getUsers();
    } else if (pageNumber === 'prev' && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    } else if (pageNumber === 'next' && currentPage < Math.ceil(totalUsers / 20)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Card title="Users" button="Add a new user" to="new-user" className="w-[1350px]">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 3fr 1fr',
          gridTemplateRows: '1fr',
          borderBottom: '1px solid black',
          padding: 5
        }}
      >
        <div>
          <p className="font-bold pl-2">Name</p>
        </div>
        <div>
          <p className="font-bold">Email</p>
        </div>
      </div>
      <div className="border-b-2 border-gray-200 mb-5">
        {isLoading && <LoadingSpinner />}
        {users.map((user: any) => (
          <UserRow
            onDelete={confirmDeleteUserHandler}
            name={user.name}
            email={user.email}
            userId={user.id}
            key={user.id}
          />
        ))}
      </div>
      <Pagination
        totalPages={Math.ceil(totalUsers / 20)}
        currentPage={currentPage}
        paginate={paginate}
      />
    </Card>
  );
};

export default Users;
