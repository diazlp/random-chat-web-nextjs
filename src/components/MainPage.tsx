import { Box, Flex, Button, Text } from '@radix-ui/themes';
import Image from 'next/image';

import { FaCircle } from 'react-icons/fa';

export default function MainPage(): React.ReactNode {
  return (
    <Box className="flex-1 flex flex-col px-8 py-6">
      <Flex align={'center'} justify={'between'}>
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
          <Button radius={'small'}>Login</Button>
          <Button radius={'small'}>Register</Button>
        </Box>

        <Box className="flex flex-row gap-2 md:gap-4 items-center">
          <Text className="text-md sm:text-4xl font-semibold">1000</Text>
          <FaCircle className="text-md sm:text-lg text-green-500" />
          <Text className="text-md sm:text-xl font-semibold text-neutral-200 text-nowrap">
            Online Users
          </Text>
        </Box>
      </Flex>
      OK
    </Box>
  );
}
