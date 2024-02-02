import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { GiConsoleController } from 'react-icons/gi';

export default function GamePopoverComponent(): React.ReactNode {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <GiConsoleController className="text-xl md:text-2xl text-zinc-400 cursor-pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded py-5 w-[200px] xl:w-[240px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-popover"
          sideOffset={5}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[12px] xl:text-[15px] leading-[19px] font-medium mb-2.5 px-5">
              Select multiplayer game
            </p>
            <fieldset className="cursor-pointer hover:bg-neutral-200 w-full px-5 items-center justify-center py-1">
              <p className="text-[11px] xl:text-[14px] ">
                Trivia Triumph: Blank Frenzy
              </p>
            </fieldset>
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
