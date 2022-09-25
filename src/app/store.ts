import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authSaga from './auth.saga';
import categoriesSaga from './categories.saga';
import operationsSaga from './operations.saga';
import { authReducer } from './auth.slice';
import { categoriesReducer } from './categories.slice';
import { operationsReducer } from './operations.slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    operations: operationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([sagaMiddleware]),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(categoriesSaga);
sagaMiddleware.run(operationsSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
