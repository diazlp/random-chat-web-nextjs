import React from 'react';
import Image from 'next/image';
import { LuLoader2 } from 'react-icons/lu';

export default function Loading(): React.ReactNode {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <Image
        src={'/ranchat-logo.png'}
        alt="ranchat-logo"
        width={150}
        height={150}
      />

      <LuLoader2 size={30} className="w-100 h-100 animate-spin" />
    </div>
  );
}
