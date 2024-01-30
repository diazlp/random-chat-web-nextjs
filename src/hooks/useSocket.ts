import { useEffect } from 'react';
import { useDispatch } from '@/store/store';
import { io, Socket } from 'socket.io-client';
import {
  setSocketId,
  setSocketInstance,
  setGuestCount,
} from '@/store/slices/socketSlice';
import { setPeerParticipants } from '@/store/slices/peerSlice';

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
      }
    );

    _socket.on('leaveRoom', () => {
      dispatch(setPeerParticipants([]));
    });

    return () => {
      _socket.disconnect();
    };
  }, [dispatch]);

  return null;
};

export default useSocket;
