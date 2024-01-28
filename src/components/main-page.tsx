'use client';

import { Box, Flex } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import useSocket from '@/hooks/useSocket';
import usePeer from '@/hooks/usePeer';
import { getSocket } from '@/store/slices/socketSlice';
import { getPeer } from '@/store/slices/peerSlice';
import OnlineIndicatorComponent from '@/components/home-page/online-indicator';
import LoginLogoComponent from '@/components/home-page/login-logo';
import ChatBoxComponent from '@/components/home-page/chat-box';
import VideoBoxComponent from './home-page/video-box';

export default function MainPage(): React.ReactNode {
  useSocket();
  usePeer();
  const { peer, id } = useSelector(getPeer);
  const { socket, guest } = useSelector(getSocket);

  return (
    <Box className="flex-1 flex flex-col px-3 md:px-8 py-6">
      <Flex align={'center'} justify={'between'}>
        <LoginLogoComponent />
        <OnlineIndicatorComponent size={guest.count} />
      </Flex>

      <Flex direction="column" gap={'5'} className="h-full">
        <VideoBoxComponent socket={socket} peerId={id} />
        <ChatBoxComponent />
      </Flex>
    </Box>
  );
}
