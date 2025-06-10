import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export enum UserType {
    ADMIN,
    COMPANY,
    TECHINICIAN
}

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email?: string;
    username?: string;
    type: UserType
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState['user']>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
