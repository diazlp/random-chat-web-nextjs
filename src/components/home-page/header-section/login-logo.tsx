import React from 'react';
import { Box, Button } from '@radix-ui/themes';
import Image from 'next/image';

export default function LoginLogoComponent(): React.ReactNode {
  return (
    <Box className="flex flex-row md:gap-4 md:items-center items-end invisible md:visible">
      <div className="hidden lg:block w-full">
        <Image
          src={'/ranchat-main.png'}
          alt="ranchat-main"
          width={'200'}
          height={'200'}
        />
      </div>
      <div className="block lg:hidden w-full">
        <Image
          src={'/ranchat-logo.png'}
          alt="ranchat-logo"
          width={'55'}
          height={'55'}
        />
      </div>
      {/* <Button radius={'small'}>Login</Button> */}
      {/* <Button radius={'small'}>Register</Button> */}
    </Box>
  );
}
