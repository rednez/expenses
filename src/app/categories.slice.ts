import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Category } from '../data/category';
import { RootState } from './store';

export const FEATURE_KEY = 'categories';

export interface CategoriesState extends EntityState<Category> {
  isLoading: boolean;
  error: string | null;
}

export const categoriesAdapter = createEntityAdapter<Category>();

export const initialState: CategoriesState = categoriesAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const categoriesSlice = createSlice({
  name: FEATURE_KEY,
  initialState,
  reducers: {
    load: (state, payload: PayloadAction<{ username: string }>) => {
      state.isLoading = true;
    },
    loadSuccess: (state, action: PayloadAction<Category[]>) => {
      categoriesAdapter.setAll(state, action);
      state.isLoading = false;
    },
    loadError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addOneCategory: (
      state,
      action: PayloadAction<{ username: string; name: string }>
    ) => {},
    addOneCategorySuccess: (state, action: PayloadAction<Category>) => {
      categoriesAdapter.addOne(state, action);
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const categoriesActions = categoriesSlice.actions;

const { selectAll, selectEntities } = categoriesAdapter.getSelectors();

export const getCategoriesState = (rootState: RootState): CategoriesState =>
  rootState[FEATURE_KEY];

export const selectAllCategories = createSelector(
  getCategoriesState,
  selectAll
);

export const selectCategoriesEntities = createSelector(
  getCategoriesState,
  selectEntities
);
