import React, { Fragment } from 'react';
import { Box } from '@radix-ui/themes';
import { Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { getPeerState } from '@/store/slices/peerSlice';
import ChatMessageComponent from './chat-message';
import ChatInputComponent from './chat-input';
import GameRequestModalComponent from './game-request';

interface ChatSectionProps {
  socket: Socket;
  clientId: string | undefined;
}

export default function ChatSection({
  socket,
  clientId,
}: ChatSectionProps): React.ReactNode {
  const { remote } = useSelector(getPeerState);

  return (
    <Fragment>
      <Box className="flex flex-col bg-neutral-100 h-full rounded-md justify-end overflow-y-visible z-10">
        <ChatMessageComponent remote={remote} clientId={clientId} />
        <ChatInputComponent socket={socket} clientId={clientId} />
      </Box>
      <GameRequestModalComponent
        socket={socket}
        remote={remote}
        clientId={clientId}
      />
    </Fragment>
  );
}
