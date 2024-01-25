import {
  Box,
  TextFieldRoot,
  TextFieldInput,
  TextFieldSlot,
} from '@radix-ui/themes';
import { IoIosSend } from 'react-icons/io';

export default function ChatBoxComponent(): React.ReactNode {
  return (
    <Box className="flex flex-col bg-neutral-100 h-full rounded-md justify-end">
      <div className="px-4 py-2">
        <TextFieldRoot>
          <TextFieldInput placeholder={'Type your message'} radius={'small'} />
          <TextFieldSlot>
            <IoIosSend className="text-xl md:text-2xl text-zinc-400 cursor-pointer" />
          </TextFieldSlot>
        </TextFieldRoot>
      </div>
    </Box>
  );
}
