import { Box, Text } from '@radix-ui/themes';
import { FaCircle } from 'react-icons/fa6';

interface OnlineIndicatorProps {
  size: number;
}

export default function OnlineIndicatorComponent({
  size,
}: OnlineIndicatorProps): React.ReactNode {
  return (
    <Box className="flex flex-row gap-2 md:gap-4 items-center">
      <Text className="text-md sm:text-4xl font-semibold">{size}</Text>
      <FaCircle className="text-md sm:text-lg text-green-500" />
      <Text className="text-md sm:text-xl font-semibold text-neutral-200 text-nowrap">
        Online Users
      </Text>
    </Box>
  );
}
