import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import EmojiPicker from '@/lib/EmojiPicker';
import { MdEmojiEmotions } from 'react-icons/md';

interface EmojiPopoverComponentProps {
  setClientMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmojiPopoverComponent({
  setClientMessage,
}: EmojiPopoverComponentProps): React.ReactNode {
  const onEmojiClickHandler = ({ emoji }: { emoji: string }) => {
    setClientMessage((prevMessage) => prevMessage + emoji);
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <MdEmojiEmotions className="hidden xl:block text-xl md:text-2xl text-zinc-400 cursor-pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="px-10" sideOffset={5} side="top">
          <div className="hidden xl:block absolute right-0 bottom-full">
            <EmojiPicker onEmojiClick={onEmojiClickHandler} />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
