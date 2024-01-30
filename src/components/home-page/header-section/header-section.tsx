import React, { Fragment } from 'react';
import LoginLogoComponent from './login-logo';
import OnlineIndicatorComponent from './online-indicator';

interface HeaderSectionProps {
  guest: { count: number; loading: boolean };
}

export default function HeaderSection({
  guest,
}: HeaderSectionProps): React.ReactNode {
  return (
    <Fragment>
      <LoginLogoComponent />
      <OnlineIndicatorComponent size={guest.count} />
    </Fragment>
  );
}
