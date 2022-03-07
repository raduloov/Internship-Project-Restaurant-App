import { createSlice } from '@reduxjs/toolkit';

interface State {
  token: string | null;
  isLoggedIn: boolean;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  userRole: string | null;
  userPicture: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false,
    userId: null,
    userName: null,
    userEmail: null,
    userRole: null,
    userPicture: null
  } as State,
  reducers: {
    checkForUser(state) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const expiresIn = localStorage.getItem('expiresIn');

      if (token && user) {
        const userInfo = JSON.parse(user);

        state.isLoggedIn = true;
        state.token = token;
        state.userName = userInfo.name;
        state.userRole = userInfo.role;
        state.userId = userInfo.id;
        state.userEmail = userInfo.email;
        state.userPicture = userInfo.pictureUrl;
      }

      const now = new Date().getTime();

      if (now >= Number(expiresIn)) {
        localStorage.clear();
        state.isLoggedIn = false;
      }
    },
    setUser(state, action) {
      const user = action.payload;

      state.userName = user.name;
      state.userRole = user.role;
      state.userId = user.id;
      state.userEmail = user.email;
      state.userPicture = user.pictureUrl;

      localStorage.setItem('user', JSON.stringify(user));
    },
    updateUser(state, action) {
      const newInfo = action.payload;
      const curUser = localStorage.getItem('user');

      if (curUser) {
        const curUserInfo = JSON.parse(curUser);

        const newUserInfo = {
          ...curUserInfo,
          name: newInfo.enteredName
        };

        const newUser = JSON.stringify(newUserInfo);

        localStorage.setItem('user', newUser);
      }
    },
    loginUser(state, action) {
      const { access_token, expires_in } = action.payload;

      if (access_token) {
        localStorage.setItem('token', access_token);
      }

      if (expires_in) {
        const now = new Date().getTime();
        const expiresIn = now + expires_in * 1000;
        localStorage.setItem('expiresIn', expiresIn.toString());
      }

      state.isLoggedIn = true;
    },
    logoutUser(state) {
      if (state.isLoggedIn) {
        localStorage.clear();
        state.isLoggedIn = false;
      }
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;
