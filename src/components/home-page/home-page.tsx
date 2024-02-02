'use client';

import React from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import useSocket from '@/hooks/useSocket';
import usePeer from '@/hooks/usePeer';
import useRandomVideo from '@/hooks/useRandomVideo';
import { getSocket } from '@/store/slices/socketSlice';
import { getPeerState } from '@/store/slices/peerSlice';
import ChatSection from './chat-section/chat-section';
import RandomVideoSection from './video-section/video-section';
import HeaderSection from './header-section/header-section';

export default function HomePage(): React.ReactNode {
  useSocket();
  usePeer();

  const { peer, id: peerId, remote } = useSelector(getPeerState);
  const { id: clientId, socket, guest } = useSelector(getSocket);
  const {
    videoRef,
    responsiveVideoRef,
    partnerVideoRef,
    myStream: mediaStream,
  } = useRandomVideo({
    socket,
    peer,
    partner: remote.participants.find((e) => e.peerId !== peerId),
  });

  return (
    <Box className="flex-1 flex flex-col px-3 md:px-8 py-6">
      <Flex align={'center'} justify={'between'}>
        <HeaderSection guest={guest} />
      </Flex>

      <Flex direction="column" gap={'5'} className="h-full overflow-hidden">
        <RandomVideoSection
          socket={socket}
          peerId={peerId}
          videoRef={videoRef}
          responsiveVideoRef={responsiveVideoRef}
          partnerVideoRef={partnerVideoRef}
          mediaStream={mediaStream}
          partnerLoading={remote.loading}
          partner={remote.participants.find((e) => e.peerId !== peerId)}
        />
        <ChatSection socket={socket} clientId={clientId} />
      </Flex>
    </Box>
  );
}
