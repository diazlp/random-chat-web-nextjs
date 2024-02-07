import React, { useState } from 'react';
import { TextFieldRoot, TextFieldInput, TextFieldSlot } from '@radix-ui/themes';
import { Socket } from 'socket.io-client';
import GamePopoverComponent from './game-popover';
import EmojiPopoverComponent from './emoji-popover';
import { IoIosSend } from 'react-icons/io';

interface ChatInputComponentProps {
  socket: Socket;
  clientId: string | undefined;
}

export default function ChatInputComponent({
  socket,
  clientId,
}: ChatInputComponentProps): React.ReactNode {
  const [clientMessage, setClientMessage] = useState<string>('');

  const onSendMessageHandler = () => {
    if (clientMessage) {
      socket.emit('sendRandomMessage', {
        clientId,
        message: clientMessage,
        time: new Date(),
      });
      setClientMessage('');
    }
  };

  return (
    <div className="relative px-4 py-2">
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
          <EmojiPopoverComponent setClientMessage={setClientMessage} />
          <IoIosSend
            className="text-xl md:text-2xl text-zinc-400 cursor-pointer"
            onClick={onSendMessageHandler}
          />
        </TextFieldSlot>
      </TextFieldRoot>
    </div>
  );
}
