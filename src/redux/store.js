import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';
import filtersReducer from './filtersSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
  },
});

export default store;
