import React, { Fragment } from 'react';
import { formatNumber } from '@/lib/utils';
import { Box, Text } from '@radix-ui/themes';
import { IoWarningOutline } from 'react-icons/io5';
import { LuLoader2 } from 'react-icons/lu';
import { FaCircle } from 'react-icons/fa6';

interface OnlineIndicatorProps {
  init: boolean;
  size: number;
  loading: boolean;
}

export default function OnlineIndicatorComponent({
  init,
  size,
  loading,
}: OnlineIndicatorProps): React.ReactNode {
  return (
    <Box className="flex flex-row gap-2 md:gap-4 items-center">
      {!init && (
        <span className="flex flex-row gap-1 align-middle items-center text-yellow-600 animate-pulse text-xs xl:text-md">
          <IoWarningOutline /> Connecting peers..
        </span>
      )}
      <Text className="text-md sm:text-4xl font-semibold">
        {!init || loading ? (
          <LuLoader2 className="animate-spin" />
        ) : (
          formatNumber(size)
        )}
      </Text>
      <FaCircle className="text-md sm:text-lg text-green-500" />
      <Text className="text-md sm:text-xl font-semibold text-neutral-200 text-nowrap">
        Online Users
      </Text>
    </Box>
  );
}
