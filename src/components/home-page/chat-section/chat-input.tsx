import React, { useState } from 'react';
import { TextFieldRoot, TextFieldInput, TextFieldSlot } from '@radix-ui/themes';
import { Socket } from 'socket.io-client';
import EmojiPicker from '@/lib/EmojiPicker';
import GamePopoverComponent from './game-popover';
import { MdEmojiEmotions } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';

interface ChatInputComponentProps {
  socket: Socket;
  clientId: string | undefined;
}

export default function ChatInputComponent({
  socket,
  clientId,
}: ChatInputComponentProps): React.ReactNode {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [clientMessage, setClientMessage] = useState<string>('');

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
          <GamePopoverComponent socket={socket} />
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
  );
}
