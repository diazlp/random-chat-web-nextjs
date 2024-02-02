import {
  createSlice,
  Draft,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import Peer from 'peerjs';

export enum RandomParticipantType {
  You = 'you',
  Guest = 'guest',
  System = 'system',
}

export interface PeerState {
  id: undefined | string;
  peer: any;
  remote: {
    loading: boolean;
    participants: { clientId: string; peerId: string }[];
    messages: {
      clientId: string | undefined;
      message: string;
      time: Date | string;
    }[];
  };
}

const initialState: PeerState = {
  id: undefined,
  peer: undefined,
  remote: {
    loading: false,
    participants: [],
    messages: [],
  },
} as const;

export const setPeerParticipants = createAsyncThunk(
  'peer/setPeerParticipants',
  async (participants: { clientId: string; peerId: string }[]) => {
    return participants;
  }
);

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
    setRemoteLoadingState: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.remote.loading>
    ) => {
      state.remote.loading = action.payload;
    },
    setRemoteMessage: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.remote.messages>
    ) => {
      state.remote.messages = [...state.remote.messages, ...action.payload];
    },
    clearRemoteMessages: (state: Draft<typeof initialState>) => {
      state.remote.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setPeerParticipants.pending, (state) => {
      state.remote.loading = true;
    });
    builder.addCase(setPeerParticipants.fulfilled, (state, action) => {
      state.remote.loading = false;
      state.remote.participants = action.payload;
    });
    builder.addCase(setPeerParticipants.rejected, (state) => {
      state.remote.loading = false;
    });
  },
});

// A helper of peer state for `useSelector` function.
export const getPeerState = (state: { peer: PeerState }) => state.peer;

// Exports all actions
export const {
  setPeerInstance,
  setPeerId,
  setRemoteLoadingState,
  setRemoteMessage,
  clearRemoteMessages,
} = peerSlice.actions;

export default peerSlice.reducer;
