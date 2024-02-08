import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = {
  status: 'all',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setFilter: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
