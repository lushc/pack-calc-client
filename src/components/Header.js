import { Heading, Flex } from "@chakra-ui/core";

const Header = () => (
  <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    padding="1.5rem"
    bg="black"
    color="white"
  >
    <Heading as="h1" size="lg">
      Pack Calculator
    </Heading>
  </Flex>
);

export default Header;
