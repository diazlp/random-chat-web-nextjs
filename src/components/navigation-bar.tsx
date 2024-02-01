import React from 'react';
import { Box } from '@radix-ui/themes';
import { FaMessage } from 'react-icons/fa6';
import { RiGroupFill, RiSettings3Fill } from 'react-icons/ri';
import Image from 'next/image';

export default function NavigationBarComponent(): React.ReactNode {
  return (
    <Box className="flex flex-row md:flex-col md:w-28 p-4 bg-neutral-100 text-center justify-center items-center gap-10 w-screen h-16 md:h-screen">
      {/* <div></div> */}

      <div>
        <RiGroupFill className="text-xl md:text-2xl text-zinc-400" />
      </div>

      <div
        className="w-14 h-14 md:w-16 md:h-16 bg-purple-500 rounded-full cursor-pointer select-none
          transition-all duration-150 [box-shadow:0_4px_0_0_#5f358f,0_7px_0_0_#ababab] md:[box-shadow:-4px_6px_0_0_#5f358f,-7px_10px_0_1px_#ababab]
          active:translate-y-2 md:active:translate-x-[-1px] 
          active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] md:active:[box-shadow:-1px_2px_0_0_#5f358f,0_0px_0_0_#ababab]
          hover:brightness-110 md:hover:[box-shadow:-5px_6px_0_0_#5f358f,-10px_12px_0_0_#ababab]
          hover:translate-x-[1px]"
      >
        <span className="flex flex-col justify-center items-center h-full">
          <Image
            src={'/ranchat-logo.png'}
            alt="ranchat-logo"
            width={'40'}
            height={'40'}
          />
        </span>
      </div>

      <div>
        <FaMessage className="text-xl md:text-2xl text-zinc-400" />
      </div>

      {/* <div>
        <RiSettings3Fill className="text-xl md:text-2xl text-zinc-400" />
      </div> */}
    </Box>
  );
}
