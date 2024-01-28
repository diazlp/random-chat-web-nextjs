import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import Peer from 'peerjs';

interface PeerState {
  id: undefined | string;
  peer: any;
  remote: {
    participants: { clientId: string; peerId: string }[];
  };
}

const initialState: PeerState = {
  id: undefined,
  peer: undefined,
  remote: {
    participants: [],
  },
} as const;

export const peerSlice = createSlice({
  name: 'peer',
  initialState,
  reducers: {
    setPeerId: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.id>
    ) => {
      state.id = action.payload;
    },
    setPeerInstance: (
      state: Draft<typeof initialState>,
      action: PayloadAction<Peer | undefined>
    ) => {
      state.peer = action.payload;
    },
    setPeerParticipants: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.remote.participants>
    ) => {
      state.remote.participants = action.payload;
    },
  },
});

// A helper of peer state for `useSelector` function.
export const getPeer = (state: { peer: PeerState }) => state.peer;

// Exports all actions
export const { setPeerInstance, setPeerId, setPeerParticipants } =
  peerSlice.actions;

export default peerSlice.reducer;
