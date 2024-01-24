import { Box } from '@radix-ui/themes';

export default function NavigationBar(): React.ReactNode {
  return (
    <Box className="md:w-28 lg:w-36 p-4 bg-neutral-100">
      <div className="font-bold text-xl">Sidebar</div>
    </Box>
    // <Container display={"block"} className="max-h-screen w-screen overflow-hidden">
    //   <Flex className="flex h-screen w-screen border border-black-700 flex-col md:flex-row">
    //     <Box className="md:w-28 lg:w-36 p-4 bg-neutral-100">
    //       <div className="font-bold text-xl">Sidebar</div>
    //     </Box>

    //     <Box className="flex-1 flex flex-col">
    //       <Section className="flex-1 overflow-x-hidden overflow-y-auto p-4">
    //         aaaaaa
    //       </Section>
    //     </Box>
    //   </Flex>
    // </Container>
  );
}
