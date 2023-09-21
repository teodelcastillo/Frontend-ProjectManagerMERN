import { Box, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomeNavBar = () => {
  return (
    <HStack padding="10px" justify={"space-between"}>
      <Image boxSize="55px" src="" alt="del Castillo & Asociados logo" />
      <HStack justify={"space-between"}>
        <Box>
          <Link to={"/login"}>Log in</Link>
        </Box>
        <Box>
          <Link to={"/signup"}>Sign up</Link>
        </Box>
      </HStack>
    </HStack>
  );
};

export default HomeNavBar;
