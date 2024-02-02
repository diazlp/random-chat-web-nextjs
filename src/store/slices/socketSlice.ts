import {
  createSlice,
  Draft,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export interface SocketState {
  id: undefined | string;
  socket: any;
  guest: {
    init: boolean;
    loading: boolean;
    count: number;
  };
}

const initialState: SocketState = {
  id: undefined,
  socket: undefined,
  guest: {
    init: false,
    loading: false,
    count: 0,
  },
} as const;

export const setGuestCount = createAsyncThunk(
  'socket/setGuestCount',
  async (count: number) => {
    return count;
  }
);

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocketId: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.id>
    ) => {
      state.id = action.payload;
    },
    setSocketInstance: (
      state: Draft<typeof initialState>,
      action: PayloadAction<Socket | undefined>
    ) => {
      state.socket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setGuestCount.pending, (state) => {
      state.guest.loading = true;
    });
    builder.addCase(setGuestCount.fulfilled, (state, action) => {
      state.guest.loading = false;
      state.guest.init = true;
      state.guest.count = action.payload;
    });
    builder.addCase(setGuestCount.rejected, (state) => {
      state.guest.init = true;
      state.guest.loading = false;
    });
  },
});

// A helper of socket state for `useSelector` function.
export const getSocket = (state: { socket: SocketState }) => state.socket;

// Exports all actions
export const { setSocketId, setSocketInstance } = socketSlice.actions;

export default socketSlice.reducer;
