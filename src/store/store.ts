import { configureStore } from '@reduxjs/toolkit';
import socketSlice from './slices/socketSlice';
import peerSlice from './slices/peerSlice';
import gameSlice from './slices/gameSlice';
import userSlice from './slices/userSlice';
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux';

/**
 * Creates a store and includes all the slices as reducers.
 */
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['socket/setSocketInstance', 'peer/setPeerInstance'],
        // Ignore these paths in the state
        ignoredPaths: ['socket.socket', 'peer.peer'],
      },
    }),
  reducer: {
    socket: socketSlice,
    peer: peerSlice,
    game: gameSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { users: UsersState }
type AppDispatch = typeof store.dispatch;

// Since we use typescript, let's utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>();

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
