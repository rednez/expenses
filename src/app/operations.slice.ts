import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { flow, groupBy, map, sortBy } from 'lodash/fp';
import { Operation } from '../data/operation';
import { calculateAmounts } from '../utils';
import { RootState } from './store';

export const FEATURE_KEY = 'operations';

export interface OperationsState extends EntityState<Operation> {
  isLoading: boolean;
  error: string | null;
}

export const operationsAdapter = createEntityAdapter<Operation>();

export const initialState: OperationsState = operationsAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const operationsSlice = createSlice({
  name: FEATURE_KEY,
  initialState,
  reducers: {
    load: (state, payload: PayloadAction<{ username: string }>) => {
      state.isLoading = true;
    },
    loadSuccess: (state, action: PayloadAction<Operation[]>) => {
      operationsAdapter.setAll(state, action);
      state.isLoading = false;
    },
    loadError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addOneOperation: (
      state,
      action: PayloadAction<{
        operation: Omit<Operation, 'id'>;
        username: string;
      }>
    ) => {},
    addOneOperationSuccess: (state, action: PayloadAction<Operation>) => {
      operationsAdapter.addOne(state, action);
    },
    deleteOneOperation: (
      state,
      action: PayloadAction<{
        operationId: string;
        username: string;
      }>
    ) => {},
    deleteOneOperationSuccess: (
      state,
      action: PayloadAction<{ operationId: string }>
    ) => {
      operationsAdapter.removeOne(state, action.payload.operationId);
    },
  },
});

export const operationsReducer = operationsSlice.reducer;

export const operationsActions = operationsSlice.actions;

const { selectAll, selectEntities } = operationsAdapter.getSelectors();

export const getOperationsState = (rootState: RootState): OperationsState =>
  rootState[FEATURE_KEY];

export const selectAllOperations = createSelector(
  getOperationsState,
  selectAll
);

export const selectHasOperations = createSelector(
  getOperationsState,
  (state) => !!state.ids.length
);

export const selectOperationsEntities = createSelector(
  getOperationsState,
  selectEntities
);

export const selectCalculatedOperations = createSelector(
  selectAllOperations,
  flow(sortBy('date'), groupBy('date'), map(calculateAmounts))
);
