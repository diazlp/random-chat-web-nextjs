import React, { useState } from 'react';
import {
  Box,
  TextFieldRoot,
  TextFieldInput,
  TextFieldSlot,
} from '@radix-ui/themes';
import EmojiPicker from '@/lib/EmojiPicker';
import { MdEmojiEmotions } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';

export default function ChatSection(): React.ReactNode {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [clientMessage, setClientMessage] = useState<string>('');

  const onEmojiClickHandler = ({ emoji }: { emoji: string }) => {
    setClientMessage((prevMessage) => prevMessage + emoji);
  };

  return (
    <Box className="flex flex-col bg-neutral-100 h-full rounded-md justify-end">
      <div className="relative px-4 py-2">
        {showEmojiPicker && (
          <div className="hidden xl:block absolute right-0 bottom-[100%] z-50">
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
          />
          <TextFieldSlot>
            <MdEmojiEmotions
              className="hidden xl:block text-xl md:text-2xl text-zinc-400 cursor-pointer"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            <IoIosSend className="text-xl md:text-2xl text-zinc-400 cursor-pointer" />
          </TextFieldSlot>
        </TextFieldRoot>
      </div>
    </Box>
  );
}
