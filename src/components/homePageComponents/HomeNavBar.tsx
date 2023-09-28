import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logocompleto from "../../assets/logocompleto.png";

import useAuthContext from "../../hooks/useAuthContext";
import NavBarMenu from "./NavBarMenu";

const HomeNavBar = () => {
  const { state } = useAuthContext();

  return (
    <HStack padding="0 10px" justify={"space-between"}>
      <Image
        h={"70px"}
        src={logocompleto}
        alt="del Castillo & Asociados logo"
      />
      {state.user && <NavBarMenu />}

      {!state.user && (
        <HStack justify={"space-between"} width={"274.44px"}>
          <Box
            as="button"
            h={"40px"}
            width={"100px"}
            borderRadius={"10px"}
            border={"1px"}
            borderColor={"#cdbf7b"}
          >
            <Link to={"/login"}>
              <Text color={"#78499b"}>Log in</Text>
            </Link>
          </Box>
          <Box
            as="button"
            h={"40px"}
            width={"100px"}
            borderRadius={"10px"}
            border={"1px"}
            borderColor={"#cdbf7b"}
          >
            <Link to={"/signup"}>
              <Text color={"#78499b"}>Sign up</Text>
            </Link>
          </Box>
        </HStack>
      )}
    </HStack>
  );
};

export default HomeNavBar;
