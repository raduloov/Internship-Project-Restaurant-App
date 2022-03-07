import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import ErrorText from '../../components/ErrorText';
import Input from '../../components/UI/Input';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { authActions } from '../../store/auth-slice';

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState<string>('');
  const [enteredPassword, setEnteredPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { baseUrl } = useSelector((state: any) => state.api);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const res = await fetch(`${baseUrl}/authorize`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      const { access_token, expires_in } = data;

      return { access_token, expires_in };
    } catch (error) {
      throw error;
    }
  };

  const getUserInfo = async (token: string) => {
    try {
      const res = await fetch(`${baseUrl}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      return data;
    } catch (error) {
      throw error;
    }
  };

  const loginHandler = async (event: FormEvent) => {
    event.preventDefault();

    setError('');

    if (enteredEmail.trim().length === 0) {
      setError('Email address is required!');
      return;
    }
    // if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(enteredEmail)) {
    //   setError('Invalid email address!');
    //   return;
    // }
    if (enteredPassword.trim().length === 0) {
      setError('Password is required!');
      return;
    }

    const credentials = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      setIsLoading(true);
      const { access_token, expires_in } = await login(credentials);
      const userInfo = await getUserInfo(access_token);

      dispatch(authActions.loginUser({ access_token, expires_in }));
      dispatch(authActions.setUser(userInfo));

      const { role } = userInfo;

      role === 'Admin' ? navigate('/orders') : navigate('/tables');
    } catch (error) {
      setIsLoading(false);
      setError('A user with the provided email address and password was not found!');
    }
  };

  return (
    <Card title="Login" className="w-[450px]">
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <form onSubmit={loginHandler} className="flex flex-col" noValidate>
          <label htmlFor="email">Email address</label>
          <Input
            type="email"
            id="email"
            onChange={(event: any) => setEnteredEmail(event.target.value)}
            value={enteredEmail}
            required
          />
          <label htmlFor="password" className="mt-4">
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
              className="flex items-center justify-center cursor-pointer bg-gray-200 border-t-2 border-r-2 border-b-2 border-gray-300 rounded-tr-md rounded-br-md px-2 w-[12%] hover:bg-gray-300 duration-300"
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </div>
          </div>
          {error && <ErrorText error={error} />}
          <div className="flex justify-end mt-6 mb-8">
            <Button className="text-primary border-primary hover:bg-primary">
              Login
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default Login;
