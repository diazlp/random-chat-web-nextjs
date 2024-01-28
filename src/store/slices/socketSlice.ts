import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

interface SocketState {
  id: undefined | string;
  socket: any;
  guestCount: number;
}

const initialState: SocketState = {
  id: undefined,
  socket: undefined,
  guestCount: 0,
} as const;

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
    setGuestCount: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.guestCount>
    ) => {
      state.guestCount = action.payload;
    },
  },
});

// A helper of socket state for `useSelector` function.
export const getSocket = (state: { socket: SocketState }) => state.socket;

// Exports all actions
export const { setSocketId, setSocketInstance, setGuestCount } =
  socketSlice.actions;

export default socketSlice.reducer;
