import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorText from '../components/ErrorText';
import { uiActions } from '../store/ui-slice';

const NewUser = () => {
  const [selectedRole, setSelectedRole] = useState<string>('1');
  const [enteredName, setEnteredName] = useState<string>('');
  const [enteredEmail, setEnteredEmail] = useState<string>('');
  const [enteredPassword, setEnteredPassword] = useState<string>('');
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { baseUrl } = useSelector((state: any) => state.api);
  const { token } = useSelector((state: any) => state.auth);

  const createUser = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        dispatch(uiActions.toggleErrorModal('Something went wrong :c'));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);

      setEnteredName('');
      setEnteredEmail('');
      setEnteredPassword('');

      dispatch(uiActions.toggleSuccessModal('User added'));
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const createUserHandler = () => {
    setError('');

    if (selectedRole === '1') {
      setError('A role must be selected!');
      return;
    }
    if (enteredName.length > 100 || enteredName.trim().length === 0) {
      setError('Name is required and must not exceed 100 characters!');
      return;
    }
    // No way to check if the email is already in use since the API doesn't return
    // ALL the users to check them for email
    if (enteredPassword.length < 8) {
      setError('Password must be at least 8 characters!');
      return;
    }

    const formData = new FormData();

    formData.append('Name', enteredName);
    formData.append('Email', enteredEmail);
    formData.append('Role', selectedRole);
    formData.append('Password', enteredPassword);

    if (file) {
      formData.append('Picture', file);
    }

    createUser(formData);
  };

  return (
    <div className="flex flex-col">
      <div className="text-gray-500 mb-3">
        <p>
          <Link to="/users" className="text-primary underline-offset-2 underline">
            Users
          </Link>{' '}
          / Add a new user
        </p>
      </div>
      <Card title="Add a new user" className="w-[500px]">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <>
            <div className="flex flex-col mt-3">
              <label htmlFor="picture">Picture</label>
              <Input
                className="cursor-pointer p-0 file:cursor-pointer file:border-none file:p-1 file:mr-2 file:px-2 file:hover:bg-gray-300 file:duration-300"
                type="file"
                id="picture"
                onChange={(event: any) => {
                  setFile(event.target.files[0]);
                }}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                className="border-2 border-gray-300 rounded-md p-1 outline-primary"
                onChange={event => setSelectedRole(event.target.value)}
                value={selectedRole}
              >
                <option value="1">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Waiter">Waiter</option>
              </select>
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                id="name"
                placeholder="Full name"
                maxLength="100"
                onChange={(event: any) => setEnteredName(event.target.value)}
                value={enteredName}
                required
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                placeholder="Email address"
                maxLength="255"
                onChange={(event: any) => setEnteredEmail(event.target.value)}
                value={enteredEmail}
                required
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(event: any) => setEnteredPassword(event.target.value)}
                value={enteredPassword}
              />
            </div>
            {error && <ErrorText error={error} />}
            <div className="flex justify-end mt-4">
              <Button
                className="text-primary border-primary hover:bg-primary"
                onClick={createUserHandler}
              >
                Save
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default NewUser;
