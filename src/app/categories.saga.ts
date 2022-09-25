import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../api/categories.api';
import { Category } from '../data/category';
import { categoriesActions } from './categories.slice';

function* fetchCategories(action: PayloadAction<{ username: string }>) {
  try {
    const categories = (yield call(
      Api.fetchAllCategories,
      action.payload.username
    )) as Category[];
    yield put({
      type: categoriesActions.loadSuccess.type,
      payload: categories,
    });
  } catch (e) {
    yield put({ type: categoriesActions.loadError.type, payload: e });
  }
}

function* addOneCategories(
  action: PayloadAction<{ username: string; name: string }>
) {
  const category = (yield call(Api.addOneCategory, action.payload)) as Category;
  yield put({
    type: categoriesActions.addOneCategorySuccess.type,
    payload: category,
  });
}

export default function* categoriesSaga() {
  yield takeLatest(categoriesActions.load.type, fetchCategories);
  yield takeLatest(categoriesActions.addOneCategory.type, addOneCategories);
}
