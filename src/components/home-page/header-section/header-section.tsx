import React from 'react';
import { type SocketState } from '@/store/slices/socketSlice';
import LoginLogoComponent from './login-logo';
import OnlineIndicatorComponent from './online-indicator';
import { Box } from '@radix-ui/themes';

interface HeaderSectionProps {
  guest: SocketState['guest'];
}

export default function HeaderSection({
  guest,
}: HeaderSectionProps): React.ReactNode {
  return (
    <Box className="flex flex-row justify-between align-middle">
      <LoginLogoComponent />
      <OnlineIndicatorComponent
        init={guest.init}
        size={guest.count}
        loading={guest.loading}
      />
    </Box>
  );
}
