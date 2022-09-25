import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewUser, User } from '../data/user';
import { RootState } from './store';

const FEATURE_KEY = 'auth';

interface AuthState {
  username: string | null;
  isLogging: boolean;
  isUserCreating: boolean;
  error: string | null;
}

const initialState: AuthState = {
  username: null,
  isLogging: false,
  isUserCreating: false,
  error: null,
};

const authSlice = createSlice({
  name: FEATURE_KEY,
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<NewUser>) => {
      state.isUserCreating = true;
    },
    createSuccess: (state, action: PayloadAction<User>) => {
      state.isUserCreating = false;
      state.username = action.payload.username;
    },
    createError: (state, action: PayloadAction<string>) => {
      state.isUserCreating = false;
      state.username = null;
      state.error = action.payload;
    },
    signIn: (state, action: PayloadAction<NewUser>) => {
      state.isLogging = true;
    },
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.isLogging = false;
      state.username = action.payload.username;
    },
    signInError: (state, action: PayloadAction<string>) => {
      state.isLogging = false;
      state.username = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.username = null;
    },
    checkAuth: (state) => {
      state.isLogging = true;
    },
    checkAuthSuccess: (state, action: PayloadAction<string>) => {
      state.isLogging = false;
      state.username = action.payload;
    },
    generateDemoData: (
      state,
      action: PayloadAction<{ username: string }>
    ) => {},
  },
});

const getAuthState = (rootState: RootState): AuthState =>
  rootState[FEATURE_KEY];

export const selectUsername = createSelector(
  getAuthState,
  (state) => state.username
);

export const selectError = createSelector(getAuthState, (state) => state.error);

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
