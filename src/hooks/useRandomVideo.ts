'use client';

import { useEffect, useRef } from 'react';
import type { MutableRefObject, RefObject } from 'react';
import { Socket } from 'socket.io-client';
import Peer from 'peerjs';

interface UseRandomVideoProps {
  socket: Socket;
  peer: Peer;
  partner: { clientId: string; peerId: string } | undefined;
}

const useRandomVideo = ({
  socket,
  peer,
  partner,
}: UseRandomVideoProps): {
  videoRef: RefObject<HTMLVideoElement>;
  responsiveVideoRef: RefObject<HTMLVideoElement>;
  partnerVideoRef: RefObject<HTMLVideoElement>;
} => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const responsiveVideoRef = useRef<HTMLVideoElement>(null);
  const partnerVideoRef = useRef<HTMLVideoElement>(null);
  const videoElement = useRef<any>(null);
  const myStream = useRef<any>(null);
  const callRef = useRef<any>(null);

  useEffect(() => {
    // Check the window width and choose the appropriate video element
    videoElement.current =
      window.innerWidth < 1280 ? responsiveVideoRef.current : videoRef.current;
  }, []);

  useEffect(() => {
    const initWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoElement.current) {
          videoElement.current.srcObject = stream;
          myStream.current = stream;
        }
      } catch (error) {
        // Empty block statement
      }
    };

    initWebcam();

    return () => {
      // Cleanup - stop the webcam stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });
      }

      if (responsiveVideoRef.current && responsiveVideoRef.current.srcObject) {
        const stream = responsiveVideoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  // Do call
  useEffect(() => {
    if (partner?.peerId) {
      const call = peer.call(partner?.peerId as string, myStream.current);

      // callRef.current = call;

      // call.on('stream', (remoteStream) => {
      //   if (videoElement.current) {
      //     videoElement.current.srcObject = remoteStream;
      //   }
      // });

      // call.on('close', () => {
      //   // Clean up resources and handle the call ending
      //   if (videoElement.current) {
      //     videoElement.current.srcObject = null; // Clear the video stream
      //   }
      // });
    }
  }, [partner]);

  // Answer call
  useEffect(() => {
    if (peer) {
      peer.on('call', (call) => {
        call.answer(myStream.current); // Answer the call with an A/V stream.

        callRef.current = call;

        call.on('stream', (remoteStream) => {
          if (partnerVideoRef.current) {
            partnerVideoRef.current.srcObject = remoteStream;
          }
        });

        call.on('close', () => {
          if (partnerVideoRef.current) {
            partnerVideoRef.current.srcObject = null;
          }
        });
      });
    }
  }, [peer]);

  useEffect(() => {
    if (socket) {
      socket.on('leaveRandomRoom', () => {
        if (callRef.current) {
          callRef.current.close();
        }
      });
    }
  }, [socket]);

  return {
    videoRef,
    responsiveVideoRef,
    partnerVideoRef,
  };
};

export default useRandomVideo;
