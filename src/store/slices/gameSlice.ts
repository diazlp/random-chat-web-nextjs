import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  loading: boolean;
  status: boolean;
  title: string | null;
  players: {
    clientId: string;
    scores: number;
  }[];
  requestedBy: string | null;
}

const initialState: GameState = {
  loading: false,
  status: false,
  title: null,
  players: [],
  requestedBy: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGameState: (state: Draft<typeof initialState>) => {
      Object.assign(state, initialState);
    },
    setInitiateGame: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{
        title: string;
        requestedBy: string;
      }>
    ) => {
      state.loading = true;
      state.title = action.payload.title;
      state.requestedBy = action.payload.requestedBy;
    },
    setStartGame: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.players>
    ) => {
      state.loading = false;
      state.status = true;
      state.players = action.payload;
    },
  },
});

// A helper of game state for `useSelector` function.
export const getGameState = (state: { game: GameState }) => state.game;

// Exports all actions
export const { resetGameState, setInitiateGame, setStartGame } =
  gameSlice.actions;

export default gameSlice.reducer;
