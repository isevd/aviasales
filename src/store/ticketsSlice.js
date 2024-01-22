import { createSlice } from '@reduxjs/toolkit';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload];
    },
  },
});

export const { setTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
