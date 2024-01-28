import { useEffect } from 'react';
import { useDispatch } from '@/store/store';
import { io, Socket } from 'socket.io-client';
import { setSocketId, setSocketInstance } from '@/store/slices/socketSlice';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Access environment variable

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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

    return () => {
      _socket.disconnect();
    };
  }, []);

  return null;
};

export default useSocket;
