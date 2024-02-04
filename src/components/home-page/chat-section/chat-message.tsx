import React, { useEffect, useRef } from 'react';
import {
  RandomParticipantType,
  type PeerState,
} from '@/store/slices/peerSlice';
import { Text } from '@radix-ui/themes';
import { format } from 'timeago.js';

interface ChatMessageComponentProps {
  remote: PeerState['remote'];
  clientId: string | undefined;
}

export default function ChatMessageComponent({
  remote,
  clientId,
}: ChatMessageComponentProps): React.ReactNode {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (remote.messages.length) {
      messageRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [remote.messages]);

  return (
    <div
      className="px-4 py-2 overflow-y-scroll scroll-smooth 
  max-h-[130px] xsh:max-h-[140px] mdh:max-h-[350px] lgh:max-h-[800px]
   "
    >
      {remote.messages.map((msg, i) =>
        msg.clientId !== RandomParticipantType.System ? (
          <div
            key={i}
            ref={messageRef}
            className={`flex flex-col my-2
          ${msg.clientId === clientId ? 'items-end' : 'items-start'}
          text-xs xl:text-md
        `}
          >
            <div className="flex flex-row gap-2">
              <span className="italic font-semibold">
                {msg.clientId === clientId
                  ? RandomParticipantType.You
                  : RandomParticipantType.Guest}
              </span>
              <span className="italic text-gray-400">- {format(msg.time)}</span>
            </div>
            <Text weight="medium">{msg.message}</Text>
          </div>
        ) : (
          <div
            className="flex flex-col items-center italic font-bold text-xs my-1"
            ref={messageRef}
            key={i}
          >
            {msg.message}
          </div>
        )
      )}
    </div>
  );
}
