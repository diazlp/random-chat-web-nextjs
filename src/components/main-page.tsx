'use client';

import { Box, Flex } from '@radix-ui/themes';
import OnlineIndicatorComponent from '@/components/home-page/online-indicator';
import LoginLogoComponent from '@/components/home-page/login-logo';
import ChatBoxComponent from '@/components/home-page/chat-box';
import useSocket from '@/hooks/useSocket';
import usePeer from '@/hooks/usePeer';
import { useSelector } from 'react-redux';
import { getSocket } from '@/store/slices/socketSlice';

export default function MainPage(): React.ReactNode {
  useSocket();
  const { peer, peerId } = usePeer();

  const { socket } = useSelector(getSocket);

  const testF = () => {
    socket.emit('joinRoom');
  };

  return (
    <Box className="flex-1 flex flex-col px-3 md:px-8 py-6">
      <Flex align={'center'} justify={'between'}>
        <LoginLogoComponent />
        <OnlineIndicatorComponent />
      </Flex>

      <div className="flex flex-col gap-5 h-full">
        <div className="flex flex-col xl:flex-row align-middle gap-2 mt-5">
          <Box className="w-full bg-black flex xl:block align-top justify-end">
            <video
              playsInline
              // ref={videoShow}
              autoPlay
              width="100%"
              height="100%"
              id="video-style"
              className="w-100 h-100 relative object-cover"
              muted={true}
            />

            <div className="absolute xl:hidden w-3/12 h-3/12 object-cover bg-red-700">
              <video
                playsInline
                // ref={videoShow}
                autoPlay
                width="100%"
                height="100%"
                id="video-style"
                muted={true}
              />
            </div>
          </Box>

          <Box className="hidden xl:block w-full bg-blue-500 relative">
            <video
              playsInline
              // ref={videoShow}
              autoPlay
              width="100%"
              height="100%"
              id="video-style"
              className="w-100 h-100 relative object-cover"
              muted={true}
            />
          </Box>
        </div>

        <ChatBoxComponent />
      </div>
    </Box>
  );
}
