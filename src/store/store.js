import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from './filtersSlice';
import ticketsReducer from './ticketsSlice';

export default configureStore({
  reducer: {
    filters: filtersReducer,
    tickets: ticketsReducer,
  },
});
