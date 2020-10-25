import { Heading, Flex, Link, Box } from "@chakra-ui/core";
import { GoMarkGithub } from "react-icons/go";

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
    <Link href="https://github.com/lushc/pack-calc-go" isExternal>
      <Box display="inline-block" mr={2} as={GoMarkGithub} />
      lushc/pack-calc-go
    </Link>
  </Flex>
);

export default Header;
