import React from 'react';
import { Container } from '@radix-ui/themes';

export default function Test(): React.ReactNode {
  return (
    <Container
      display={'block'}
      className="max-h-screen w-screen overflow-hidden"
    >
      random page
    </Container>
  );
}
