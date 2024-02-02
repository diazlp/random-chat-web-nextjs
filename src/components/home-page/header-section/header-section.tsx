import React, { Fragment } from 'react';
import { type SocketState } from '@/store/slices/socketSlice';
import LoginLogoComponent from './login-logo';
import OnlineIndicatorComponent from './online-indicator';

interface HeaderSectionProps {
  guest: SocketState['guest'];
}

export default function HeaderSection({
  guest,
}: HeaderSectionProps): React.ReactNode {
  return (
    <Fragment>
      <LoginLogoComponent />
      <OnlineIndicatorComponent
        init={guest.init}
        size={guest.count}
        loading={guest.loading}
      />
    </Fragment>
  );
}
