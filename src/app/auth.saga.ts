import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { NewUser, User } from '../data/user';
import * as Api from '../api/users.api';
import { authActions } from './auth.slice';
import { categoriesActions } from './categories.slice';
import { operationsActions } from './operations.slice';

function* createUser(action: PayloadAction<NewUser>) {
  try {
    const user = (yield call(Api.createUser, action.payload)) as User;
    yield put({ type: authActions.createSuccess.type, payload: user });
  } catch (e) {
    yield put({ type: authActions.createError.type, payload: e });
  }
}

function* signIn(action: PayloadAction<User>) {
  try {
    const user = (yield call(Api.sighIn, action.payload)) as User;
    yield put({ type: authActions.signInSuccess.type, payload: user });
  } catch (e) {
    yield put({ type: authActions.signInError.type, payload: e });
  }
}

function* generateDemoData(action: PayloadAction<{ username: string }>) {
  const user = (yield call(
    Api.generateDemoData,
    action.payload.username
  )) as User;
  yield put({
    type: categoriesActions.loadSuccess.type,
    payload: user.categories,
  });
  yield put({
    type: operationsActions.loadSuccess.type,
    payload: user.operations,
  });
}

export default function* authSaga() {
  yield takeLatest(authActions.createUser.type, createUser);
  yield takeLatest(authActions.signIn.type, signIn);
  yield takeLatest(authActions.generateDemoData.type, generateDemoData);
}
