import React from 'react';
import { Box, Button } from '@radix-ui/themes';
import { Socket } from 'socket.io-client';

interface RandomVideoSectionProps {
  socket: Socket;
  peerId: string | undefined;
  videoRef: any;
  responsiveVideoRef: any;
  partnerVideoRef: any;
}

export default function RandomVideoSection({
  socket,
  peerId,
  videoRef,
  responsiveVideoRef,
  partnerVideoRef,
}: RandomVideoSectionProps): React.ReactNode {
  const randomHandler = () => {
    socket.emit('joinRoom', peerId);
  };

  return (
    <div className="flex flex-col xl:flex-row align-middle gap-2 mt-5 mb-0">
      <Box className="w-full bg-black relative align-top justify-end xl:justify-center xl:items-end h-[30vh] xl:h-[50vh]">
        <video
          playsInline
          ref={partnerVideoRef}
          autoPlay
          width="100%"
          className="w-full h-full relative object-cover"
          muted={true}
        />

        <div className="absolute xl:hidden w-3/12 h-3/12 object-cover bg-red-700 top-0 right-0">
          <video
            playsInline
            ref={responsiveVideoRef}
            autoPlay
            width="100%"
            className="w-full h-full relative object-cover"
            muted={true}
          />
        </div>

        <div className="absolute block left-1/2 bottom-2 transform -translate-x-1/2">
          <div className="flex flex-row gap-4">
            <Button
              className="xl:px-7 xl:py-5 xl:bg-gray-100 xl:text-black xl:font-semibold"
              onClick={randomHandler}
            >
              Ran
            </Button>
            <Button className="xl:px-7 xl:py-5 xl:bg-red-100 xl:text-black xl:font-semibold">
              Stop
            </Button>
          </div>
        </div>
      </Box>

      <Box className="hidden xl:block w-full bg-blue-500 relative h-[50vh]">
        <video
          playsInline
          ref={videoRef}
          autoPlay
          width="100%"
          className="w-full h-full relative object-cover"
          muted={true}
        />
      </Box>
    </div>
  );
}
