import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../../axios/model';

interface LoginInfo {
  username: string;
  password: string;
}

const initialState = {
  user: undefined as undefined | UserModel,
  token: undefined as undefined | string,
  loginInfo: {
    username: '',
    password: '',
  } as LoginInfo,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
    resetAuthData: (state) => {
      state.user = undefined;
      state.token = undefined;
    },
    setUser(state, action: PayloadAction<UserModel>) {
      state.user = action.payload;
      console.log('setUser------', state.user);
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      console.log('setToken------', state.token);
    },
    setLoginEmail(state, action: PayloadAction<LoginInfo>) {
      state.loginInfo = action.payload;
    },
  },
});

export const { reset, resetAuthData, setUser, setToken, setLoginEmail } =
  authSlice.actions;
export default authSlice.reducer;
