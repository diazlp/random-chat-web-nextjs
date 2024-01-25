import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  id: null | string;
}

const initialState: SocketState = {
  id: null,
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
  },
});

// A helper of socket state for `useSelector` function.
export const getSocketId = (state: { socket: SocketState }) => state.socket;

// Exports all actions
export const { setSocketId } = socketSlice.actions;

export default socketSlice.reducer;
