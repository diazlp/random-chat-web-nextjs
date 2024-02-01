import React, { Fragment, useState } from 'react';
import type { MutableRefObject, RefObject } from 'react';
import { Box, Button } from '@radix-ui/themes';
import { Socket } from 'socket.io-client';
import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';

interface RandomVideoSectionProps {
  socket: Socket;
  peerId: string | undefined;
  videoRef: RefObject<HTMLVideoElement>;
  responsiveVideoRef: RefObject<HTMLVideoElement>;
  partnerVideoRef: RefObject<HTMLVideoElement>;
  mediaStream: MutableRefObject<any>;
  partner: { clientId: string; peerId: string } | undefined;
}

export default function RandomVideoSection({
  socket,
  peerId,
  videoRef,
  responsiveVideoRef,
  partnerVideoRef,
  mediaStream,
  partner,
}: RandomVideoSectionProps): React.ReactNode {
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);

  const onRandomHandler = () => {
    socket.emit('joinRandomRoom', peerId);
  };

  const onStopHandler = () => {
    socket.emit('leaveRandomRoom', peerId);
    if (partnerVideoRef.current) {
      partnerVideoRef.current.srcObject = null;
    }
  };

  const onAudioToggler = () => {
    const audioTracks: MediaStreamTrack[] =
      mediaStream.current.getAudioTracks();
    audioTracks.forEach((track: any) => (track.enabled = !track.enabled));
    setIsAudioEnabled(!isAudioEnabled);
  };

  const onVideoToggler = () => {
    const videoTracks: MediaStreamTrack[] =
      mediaStream.current.getVideoTracks();
    videoTracks.forEach((track: any) => (track.enabled = !track.enabled));
    setIsVideoEnabled(!isVideoEnabled);
  };

  return (
    <div className="flex flex-col xl:flex-row align-middle gap-2 mt-5 mb-0">
      <Box className="w-full bg-black relative h-[30vh] xl:h-[50vh]">
        <video
          playsInline
          ref={partnerVideoRef}
          autoPlay
          width="100%"
          className="w-full h-full relative object-cover"
        />

        <div className="absolute xl:hidden w-3/12 h-3/12 object-cover bg-teal-500 top-0 right-0">
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
            {partner ? (
              <Fragment>
                <Button
                  className="xl:px-7 xl:py-5 xl:bg-red-100 xl:text-black xl:font-semibold"
                  onClick={onStopHandler}
                >
                  Stop
                </Button>
                <Button
                  className="xl:px-7 xl:py-5 xl:bg-purple-400 xl:text-black xl:font-semibold"
                  // onClick={onStopHandler}
                >
                  Request
                </Button>
              </Fragment>
            ) : (
              <Button
                className="xl:px-7 xl:py-5 xl:bg-gray-100 xl:text-black xl:font-semibold"
                onClick={onRandomHandler}
              >
                Ran
              </Button>
            )}
          </div>
        </div>
      </Box>

      <Box className="hidden xl:block w-full bg-amber-500 relative h-[50vh]">
        <video
          playsInline
          ref={videoRef}
          autoPlay
          width="100%"
          className="w-full h-full relative object-cover"
          muted={true}
        />

        {mediaStream?.current && (
          <div className="hidden xl:block absolute left-1/2 bottom-2 transform -translate-x-1/2">
            <div className="flex flex-row gap-4">
              <Button
                className="p-5 bg-neutral-100 text-black"
                radius={'full'}
                onClick={onAudioToggler}
              >
                {isAudioEnabled ? (
                  <AiOutlineAudio size={20} />
                ) : (
                  <AiOutlineAudioMuted
                    size={20}
                    style={{ transform: 'rotateY(180deg)' }}
                  />
                )}
              </Button>
              <Button
                className="p-5 bg-neutral-100 text-black"
                radius={'full'}
                onClick={onVideoToggler}
              >
                {isVideoEnabled ? (
                  <FaVideo size={20} />
                ) : (
                  <FaVideoSlash size={20} />
                )}
              </Button>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}
