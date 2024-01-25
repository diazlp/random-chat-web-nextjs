import { useEffect } from 'react';
import { useDispatch } from '@/store/store';
import { io, Socket } from 'socket.io-client';
import { setSocketId } from '@/store/slices/socketSlice';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ''; // Access environment variable

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket', 'polling'],
      forceNew: true,
      reconnectionAttempts: 10,
      timeout: 10000,
      extraHeaders: {
        'Access-Control-Allow-Origin': '*',
      },
    }) as Socket;

    // Save the id of socket instance to Redux when connected
    socket.on('connection', (socket): void => {
      dispatch(setSocketId(socket.id));
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return null;
};

export default useSocket;
