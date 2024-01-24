import { Box, Flex } from '@radix-ui/themes';
import OnlineIndicatorComponent from './home-page/online-indicator';
import LoginLogoComponent from './home-page/login-logo';

export default function MainPage(): React.ReactNode {
  return (
    <Box className="flex-1 flex flex-col px-8 py-6">
      <Flex align={'center'} justify={'between'}>
        <LoginLogoComponent />
        <OnlineIndicatorComponent />
      </Flex>

      <video
        playsInline
        // ref={videoShow}
        autoPlay
        width="100%"
        height="100%"
        id="video-user"
        className="border border-green-700"
      />
    </Box>
  );
}
