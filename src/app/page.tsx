import Image from 'next/image';
import { Container, Button, Flex, Box, Section } from '@radix-ui/themes';
import NavigationBar from '@/components/NavigationBar';
import MainPage from '@/components/MainPage';

export default function Home(): React.ReactNode {
  return (
    <Container
      display={'block'}
      className="max-h-screen w-screen overflow-hidden"
    >
      <Flex className="flex flex-col-reverse md:flex-row h-screen w-screen border border-black-700">
        <NavigationBar />
        <MainPage />
      </Flex>
    </Container>
  );
}
