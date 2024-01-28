import { Box, Button } from '@radix-ui/themes';
import { Socket } from 'socket.io-client';

interface VideoBoxProps {
  socket: Socket;
  peerId: string | undefined;
}

export default function VideoBoxComponent({
  socket,
  peerId,
}: VideoBoxProps): React.ReactNode {
  const testF = () => {
    socket.emit('joinRoom', peerId);
  };

  return (
    <div className="flex flex-col xl:flex-row align-middle gap-2 mt-5">
      <Box className="w-full bg-black flex align-top justify-end xl:justify-center xl:items-end">
        <video
          playsInline
          // ref={videoShow}
          autoPlay
          width="100%"
          height="100%"
          id="video-style"
          className="w-100 h-100 relative object-cover"
          muted={true}
        />

        <div className="absolute xl:hidden w-3/12 h-3/12 object-cover bg-red-700">
          <video
            playsInline
            // ref={videoShow}
            autoPlay
            width="100%"
            height="100%"
            id="video-style"
            muted={true}
          />
        </div>

        <div className="absolute hidden xl:block mb-3">
          <div className="flex flex-row gap-4">
            <Button
              className="px-7 py-5 bg-gray-100 text-black font-semibold"
              onClick={testF}
            >
              Ran
            </Button>
            <Button className="px-7 py-5 bg-red-100 text-black font-semibold">
              Stop
            </Button>
          </div>
        </div>
      </Box>

      <Box className="hidden xl:block w-full bg-blue-500 relative">
        <video
          playsInline
          // ref={videoShow}
          autoPlay
          width="100%"
          height="100%"
          id="video-style"
          className="w-100 h-100 relative object-cover"
          muted={true}
        />
      </Box>
    </div>
  );
}
