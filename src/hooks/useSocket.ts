import { useEffect } from 'react';
import { createSystemMessage } from '@/lib/utils';
import { useDispatch } from '@/store/store';
import { io, Socket } from 'socket.io-client';
import {
  setSocketId,
  setSocketInstance,
  setGuestCount,
} from '@/store/slices/socketSlice';
import {
  setPeerParticipants,
  setRemoteMessage,
  clearRemoteMessages,
} from '@/store/slices/peerSlice';
import {
  resetGameState,
  setInitiateGame,
  setStartGame,
  setGuessedAnswer,
} from '@/store/slices/gameSlice';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize Socket.io connection
    const _socket = io(API_BASE_URL, {
      transports: ['websocket', 'polling'],
      forceNew: true,
      reconnectionAttempts: 10,
      timeout: 10000,
      extraHeaders: {
        'Access-Control-Allow-Origin': '*',
      },
    }) as Socket;

    _socket.on('connected', (socketId: string) => {
      dispatch(setSocketId(socketId));
      dispatch(setSocketInstance(_socket));
    });

    _socket.on('disconnect', () => {
      console.log('socket server disconnected.');
    });

    _socket.on('guestCount', (size: number) => {
      dispatch(setGuestCount(size));
    });

    _socket.on(
      'guestParticipants',
      (participants: { clientId: string; peerId: string }[]) => {
        dispatch(setPeerParticipants(participants));
        dispatch(clearRemoteMessages());
      }
    );

    _socket.on('leaveRandomRoom', () => {
      dispatch(setPeerParticipants([]));
      dispatch(resetGameState());
      dispatch(
        setRemoteMessage([createSystemMessage('The chat session has ended.')])
      );
    });

    _socket.on(
      'sendRandomMessage',
      (data: { clientId: string; message: string; time: Date }) => {
        dispatch(setRemoteMessage([data]));
      }
    );

    _socket.on(
      'userSelectGame',
      ({ title, clientId }: { title: string; clientId: string }) => {
        dispatch(
          setInitiateGame({
            title,
            requestedBy: clientId,
          })
        );
      }
    );

    _socket.on(
      'acceptGameChallenge',
      (clients: { clientId: string; peerId: string; isReady: boolean }[]) => {
        const players = clients.map((client) => ({
          clientId: client.clientId,
          scores: 0,
        }));

        dispatch(setStartGame(players));
        dispatch(
          setRemoteMessage([
            createSystemMessage(
              'Game challenge accepted. Type "/stop" to quit challenge.'
            ),
          ])
        );
      }
    );

    _socket.on('rejectGameChallenge', () => {
      dispatch(resetGameState());
      dispatch(
        setRemoteMessage([createSystemMessage('Game challenge rejected.')])
      );
    });

    _socket.on('stopGameChallenge', () => {
      dispatch(resetGameState());
    });

    _socket.on('guessedGameChallenge', (clientId: string) => {
      dispatch(setGuessedAnswer(clientId));
    });

    _socket.on(
      'sendGameChallenge',
      (data: { clientId: string; message: string; time: Date }) => {
        dispatch(setRemoteMessage([data]));
      }
    );

    return () => {
      _socket.disconnect();
    };
  }, [dispatch]);

  return null;
};

export default useSocket;
