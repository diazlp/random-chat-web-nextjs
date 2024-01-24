import { Box, Text } from '@radix-ui/themes';
import { FaCircle } from 'react-icons/fa6';

export default function OnlineIndicatorComponent(): React.ReactNode {
  return (
    <Box className="flex flex-row gap-2 md:gap-4 items-center">
      <Text className="text-md sm:text-4xl font-semibold">1000</Text>
      <FaCircle className="text-md sm:text-lg text-green-500" />
      <Text className="text-md sm:text-xl font-semibold text-neutral-200 text-nowrap">
        Online Users
      </Text>
    </Box>
  );
}
