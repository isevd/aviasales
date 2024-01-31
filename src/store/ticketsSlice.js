import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

export const fetchId = createAsyncThunk('tickets/fetchId', async function () {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search');
    if (!response.ok) {
      throw new Error();
    }
    const result = await response.json();
    return result;
  } catch (error) {
    message.error('Ошибка при получении данных с сервера');
    throw error;
  }
});

export const fetchTicketsData = createAsyncThunk('tickets/fetchTicketData', async (searchId, { dispatch }) => {
  const arr = [];

  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
    if (response.ok) {
      const { tickets, stop } = await response.json();
      arr.push(...tickets);
      if (!stop) {
        dispatch(fetchTicketsData(searchId));
      } else if (stop) {
        dispatch(stopFetching());
      }
    } else if (response.status === 500) {
      dispatch(fetchTicketsData(searchId));
    } else if (!response.ok) {
      throw new Error();
    }
    return arr;
  } catch {
    message.error('Ошибка при получении данных с сервера');
  }

  return arr;
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    status: '',
    searchId: null,
    error: null,
  },
  reducers: {
    stopFetching(state) {
      state.status = 'resolved';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchId.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.error = null;
      state.searchId = action.payload.searchId;
    });
    builder.addCase(fetchTicketsData.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(fetchTicketsData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchTicketsData.fulfilled, (state, action) => {
      state.error = null;
      state.tickets.push(...action.payload);
    });
  },
});

export const searchId = (state) => state.tickets.searchId;
export const fetchStatus = (state) => state.tickets.status;

export const { stopFetching } = ticketsSlice.actions;

export default ticketsSlice.reducer;
