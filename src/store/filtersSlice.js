import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    transferFilter: {
      all: true,
      withoutTransfer: true,
      oneTransfer: true,
      twoTransfer: true,
      threeTransfer: true,
    },
    costFilter: 'cheapest',
  },
  reducers: {
    setTransferFilter(state, action) {
      if (action.payload) {
        Object.assign(state.transferFilter, {
          withoutTransfer: true,
          oneTransfer: true,
          twoTransfer: true,
          threeTransfer: true,
        });
      } else {
        Object.assign(state.transferFilter, {
          withoutTransfer: false,
          oneTransfer: false,
          twoTransfer: false,
          threeTransfer: false,
        });
      }
    },
    setTargetFilter(state, action) {
      Object.assign(state.transferFilter, action.payload);
    },
    setCostFilter(state, action) {
      state.costFilter = action.payload.cost;
    },
  },
});

export const { setTransferFilter, setTargetFilter, setCostFilter } = filterSlice.actions;

export default filterSlice.reducer;
