import React from 'react';
import { Container, Flex } from '@radix-ui/themes';
import NavigationBarComponent from '@/components/navigation-bar';
import HomePage from '@/components/home-page/home-page';

export default function Home(): React.ReactNode {
  return (
    <Container display={'block'} className="max-h-screen w-screen">
      <Flex className="flex flex-col-reverse md:flex-row h-screen w-screen border border-black-700 overflow-hidden">
        <NavigationBarComponent />
        <HomePage />
      </Flex>
    </Container>
  );
}
