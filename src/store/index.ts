// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import companyListReducer from './slices/companyListSlice';
import jobReducer from "./slices/jobSlice";
import technicianReducer from './slices/technicianSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  companyList: companyListReducer,
  job: jobReducer,
  technician: technicianReducer,
});

const persistConfig = {
  key: 'root',
  storage,
//   whitelist: ['auth'], // only persist auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
