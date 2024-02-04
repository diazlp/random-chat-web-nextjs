import {
  createSlice,
  Draft,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { createSystemMessage, getPlayerScore } from '@/lib/utils';
import { setRemoteMessage } from './peerSlice';

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

export const setGuessedAnswer = createAsyncThunk(
  'game/setGuessedAnswer',
  async (payload: string, { getState, dispatch }) => {
    const state = getState() as Draft<any>;
    const clientId = state.socket.id;

    const yourScore = getPlayerScore(state.game.players, clientId);
    const guestScores = getPlayerScore(state.game.players, clientId, true);

    const messages = [
      createSystemMessage(
        "You are correct! Type '/next' for the next question."
      ),
      createSystemMessage('Current Score'),
      createSystemMessage(`Yours: ${yourScore}  |   Guest: ${guestScores}`),
    ];

    dispatch(setRemoteMessage(messages));

    return payload;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(setGuessedAnswer.pending, (state, action) => {
      const payload = action.meta.arg;

      state.players = state.players.map((player) =>
        player.clientId === payload
          ? { ...player, scores: player.scores + 5 }
          : player
      );
    });
  },
});

// A helper of game state for `useSelector` function.
export const getGameState = (state: { game: GameState }) => state.game;

// Exports all actions
export const { resetGameState, setInitiateGame, setStartGame } =
  gameSlice.actions;

export default gameSlice.reducer;
