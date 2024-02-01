import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  Box,
  TextFieldRoot,
  TextFieldInput,
  TextFieldSlot,
} from '@radix-ui/themes';
import { Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { getPeer } from '@/store/slices/peerSlice';
import { format } from 'timeago.js';
// import ScrollToBottom from "react-scroll-to-bottom";
import EmojiPicker from '@/lib/EmojiPicker';
import { MdEmojiEmotions } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';

interface ChatSectionProps {
  socket: Socket;
  clientId: string | undefined;
}

export default function ChatSection({
  socket,
  clientId,
}: ChatSectionProps): React.ReactNode {
  const { remote } = useSelector(getPeer);
  const messageRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [clientMessage, setClientMessage] = useState<string>('');

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (remote.messages.length) {
      messageRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [remote.messages]);

  const onEmojiClickHandler = ({ emoji }: { emoji: string }) => {
    setClientMessage((prevMessage) => prevMessage + emoji);
  };

  const onSendMessageHandler = () => {
    if (clientMessage) {
      socket.emit('sendRandomMessage', {
        clientId,
        message: clientMessage,
        time: new Date(),
      });
      setClientMessage('');
      setShowEmojiPicker(false);
    }
  };

  return (
    <Box className="flex flex-col bg-neutral-100 h-full rounded-md justify-end overflow-y-visible z-10">
      <div
        className="px-4 py-2 overflow-y-scroll scroll-smooth 
      max-h-[130px] xsh:max-h-[140px] mdh:max-h-[350px] lgh:max-h-[800px]
       "
      >
        {remote.messages.map((msg, i) =>
          msg.clientId ? (
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
                  {msg.clientId === clientId ? 'you' : 'guest'}
                </span>
                <span className="italic text-gray-400">
                  - {format(msg.time)}
                </span>
              </div>
              <Text weight="medium">{msg.message}</Text>
            </div>
          ) : (
            <div
              className="flex flex-col items-center italic font-bold text-xs"
              ref={messageRef}
            >
              {msg.message}
            </div>
          )
        )}
      </div>

      <div className="relative px-4 py-2">
        {showEmojiPicker && (
          <div className="hidden xl:block absolute right-0 bottom-full">
            <EmojiPicker lazyLoadEmojis onEmojiClick={onEmojiClickHandler} />
          </div>
        )}
        <TextFieldRoot>
          <TextFieldInput
            placeholder={'Type your message'}
            radius={'small'}
            value={clientMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setClientMessage(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                onSendMessageHandler();
              }
            }}
          />
          <TextFieldSlot>
            <MdEmojiEmotions
              className="hidden xl:block text-xl md:text-2xl text-zinc-400 cursor-pointer"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            <IoIosSend
              className="text-xl md:text-2xl text-zinc-400 cursor-pointer"
              onClick={onSendMessageHandler}
            />
          </TextFieldSlot>
        </TextFieldRoot>
      </div>
    </Box>
  );
}
