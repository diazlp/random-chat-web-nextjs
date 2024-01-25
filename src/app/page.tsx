import { Container, Flex } from '@radix-ui/themes';
import NavigationBarComponent from '@/components/navigation-bar';
import MainPage from '@/components/main-page';

export default function Home(): React.ReactNode {
  return (
    <Container
      display={'block'}
      className="max-h-screen w-screen overflow-hidden"
    >
      <Flex className="flex flex-col-reverse md:flex-row h-screen w-screen border border-black-700">
        <NavigationBarComponent />
        <MainPage />
      </Flex>
    </Container>
  );
}
