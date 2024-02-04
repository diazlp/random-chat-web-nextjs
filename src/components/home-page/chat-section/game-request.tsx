import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@radix-ui/themes';
import { type PeerState } from '@/store/slices/peerSlice';
import { useSelector } from '@/store/store';
import { getGameState } from '@/store/slices/gameSlice';
import { Socket } from 'socket.io-client';
import { ChallengeResponseType } from './enum/game.enum';

interface GameRequestModalComponentProps {
  socket: Socket;
  remote: PeerState['remote'];
  clientId: string | undefined;
}

export default function GameRequestModalComponent({
  socket,
  remote,
  clientId,
}: GameRequestModalComponentProps): React.ReactNode {
  const { loading, title, requestedBy } = useSelector(getGameState);

  const onResponseChallenge = (value: string) => {
    socket.emit('userResponseGameReq', value);
  };

  return (
    <Dialog.Root
      open={
        loading && requestedBy !== clientId && remote.participants.length > 0
      }
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-75 data-[state=open]:animate-requestGameOverlay fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-requestGameContent fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 text-[17px] font-medium text-center">
            <div className="text-[13px] xl:text-[17px]">
              Guest has challenged you to play:
            </div>
            <span className="text-[14px] xl:text-[18px] uppercase font-extrabold">
              {title}
            </span>
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-8 text-[12px] xl:text-[15px] leading-normal">
            Fill in the blanks before your opponents do! Type &#8202;
            <span className="italic font-bold">"/hint"</span> command to gain
            the answer clue.
          </Dialog.Description>
          <div className="flex flex-row items-center justify-around gap-2">
            <Button
              className="px-2 xl:py-1 text-sm xl:text-lg bg-purple-700 text-white font-semibold rounded-md cursor-pointer"
              onClick={() =>
                onResponseChallenge(ChallengeResponseType.Accepted)
              }
            >
              Accept
            </Button>
            <Button
              className="px-2 xl:py-1 text-sm xl:text-lg bg-red-700 text-white font-semibold rounded-md cursor-pointer"
              onClick={() =>
                onResponseChallenge(ChallengeResponseType.Rejected)
              }
            >
              Reject
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
