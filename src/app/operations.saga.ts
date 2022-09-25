import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../api/operations.api';
import { Operation } from '../data/operation';
import { operationsActions } from './operations.slice';

function* fetchOperations(action: PayloadAction<{ username: string }>) {
  try {
    const operations = (yield call(
      Api.fetchAllOperations,
      action.payload.username
    )) as Operation[];
    yield put({
      type: operationsActions.loadSuccess.type,
      payload: operations,
    });
  } catch (e) {
    yield put({ type: operationsActions.loadError.type, payload: e });
  }
}

function* addOneOperation(
  action: PayloadAction<{ operation: Omit<Operation, 'id'>; username: string }>
) {
  const operation = (yield call(
    Api.addOneOperation,
    action.payload
  )) as Operation;
  yield put({
    type: operationsActions.addOneOperationSuccess.type,
    payload: operation,
  });
}

function* deleteOneOperation(
  action: PayloadAction<{ operationId: string; username: string }>
) {
  yield call(Api.deleteOperation, action.payload);
  yield put({
    type: operationsActions.deleteOneOperationSuccess.type,
    payload: { operationId: action.payload.operationId },
  });
}

export default function* operationsSaga() {
  yield takeLatest(operationsActions.load.type, fetchOperations);
  yield takeLatest(operationsActions.addOneOperation.type, addOneOperation);
  yield takeLatest(
    operationsActions.deleteOneOperation.type,
    deleteOneOperation
  );
}
