'use client';

import React from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import useSocket from '@/hooks/useSocket';
import usePeer from '@/hooks/usePeer';
import useRandomVideo from '@/hooks/useRandomVideo';
import { getSocket } from '@/store/slices/socketSlice';
import { getPeer } from '@/store/slices/peerSlice';
import ChatSection from './chat-section/chat-section';
import RandomVideoSection from './video-section/video-section';
import HeaderSection from './header-section/header-section';

export default function HomePage(): React.ReactNode {
  useSocket();
  usePeer();

  const { peer, id, remote } = useSelector(getPeer);
  const { socket, guest } = useSelector(getSocket);
  const { videoRef, responsiveVideoRef, partnerVideoRef } = useRandomVideo({
    socket,
    peer,
    partner: remote.participants.find((e) => e.peerId !== id),
  });

  return (
    <Box className="flex-1 flex flex-col px-3 md:px-8 py-6">
      <Flex align={'center'} justify={'between'}>
        <HeaderSection guest={guest} />
      </Flex>

      <Flex direction="column" gap={'5'} className="h-full">
        <RandomVideoSection
          socket={socket}
          peerId={id}
          videoRef={videoRef}
          responsiveVideoRef={responsiveVideoRef}
          partnerVideoRef={partnerVideoRef}
        />
        <ChatSection />
      </Flex>
    </Box>
  );
}
