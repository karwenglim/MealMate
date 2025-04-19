import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

interface QueryState {
  searchQuery: string;
}

const initialState: QueryState = {
  searchQuery: '',
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearQuery: (state) => {
      state.searchQuery = '';
    },
  },
});

export const { setQuery, clearQuery } = querySlice.actions;
export const selectQuery = (state: RootState) => state.query.searchQuery;
export default querySlice.reducer;
