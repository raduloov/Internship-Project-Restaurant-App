import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorText from '../components/ErrorText';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { authActions } from '../store/auth-slice';
import { uiActions } from '../store/ui-slice';

const Profile = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [enteredName, setEnteredName] = useState<string>('');
  const [enteredPassword, setEnteredPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { baseUrl } = useSelector((state: any) => state.api);
  const { token, userEmail } = useSelector((state: any) => state.auth);

  const updateUser = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/users/me`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });

      if (!response.ok) {
        dispatch(uiActions.toggleErrorModal('Something went wrong :c'));
        return;
      }

      const newData = {
        enteredName,
        enteredPassword
      };

      dispatch(authActions.updateUser(newData));
      dispatch(authActions.checkForUser());

      setIsLoading(false);

      setEnteredName('');
      setEnteredPassword('');

      dispatch(uiActions.toggleSuccessModal('User updated'));
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const saveHandler = async (event: FormEvent) => {
    event.preventDefault();

    setError('');

    if (enteredName.length > 100 || enteredName.trim().length === 0) {
      setError('Name is required and must not exceed 100 characters!');
      return;
    }
    if (enteredPassword.length < 8) {
      setError('Password must be at least 8 characters long!');
      return;
    }
    if (file && (file.size > 2000000 || file.type.split('/')[0] !== 'image')) {
      setError('File must be maximum of 2MB in size and in a valid image format!');
      return;
    }

    const formData = new FormData();

    formData.append('Name', enteredName);
    formData.append('Email', userEmail);
    formData.append('Password', enteredPassword);

    if (file) {
      formData.append('Picture', file);
    }

    updateUser(formData);
  };

  return (
    <Card title="Profile" className="w-[450px]">
      <form onSubmit={saveHandler} className="flex flex-col">
        <div>
          <div className="m-auto w-[190px] h-[190px] border-2 border-gray-300 rounded-md flex justify-center items-center">
            <div className="w-[180px] h-[180px] bg-gray-500 flex">
              <p className="text-white m-auto">User Picture</p>
            </div>
          </div>
        </div>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <>
            <label htmlFor="picture" className="mt-3">
              Picture
            </label>
            <Input
              className="cursor-pointer p-0 file:cursor-pointer file:border-none file:p-1 file:mr-2 file:px-2 file:hover:bg-gray-300 file:duration-300"
              type="file"
              id="picture"
              onChange={(event: any) => {
                setFile(event.target.files[0]);
              }}
            />
            <label htmlFor="name" className="mt-3">
              Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Full name"
              onChange={(event: any) => setEnteredName(event.target.value)}
              value={enteredName}
              maxLength="100"
            />
            <label htmlFor="email" className="mt-3">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Email address"
              value={userEmail}
              readOnly
            />
            <label htmlFor="password" className="mt-3">
              Password
            </label>
            <div className="flex">
              <Input
                className="w-full rounded-tr-none rounded-br-none mb-0"
                type={showPassword ? 'text' : 'password'}
                id="password"
                onChange={(event: any) => setEnteredPassword(event.target.value)}
                value={enteredPassword}
                required
              />
              <div
                onClick={() => setShowPassword(prevState => !prevState)}
                className="flex items-center justify-center cursor-pointer bg-gray-200 border-t-2 border-r-2 border-b-2 border-gray-300 rounded-tr-md rounded-br-md px-2 w-[13%] hover:bg-gray-300 duration-300"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </div>
            </div>
          </>
        )}
        {error && <ErrorText error={error} />}
        <div className="flex justify-end mt-4">
          <Button className="text-primary border-primary hover:bg-primary">
            Save
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Profile;
