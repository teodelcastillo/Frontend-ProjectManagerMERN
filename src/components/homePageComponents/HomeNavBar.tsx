import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logocompleto from "../../assets/logocompleto.png";

const HomeNavBar = () => {
  return (
    <HStack padding="10px" justify={"space-between"}>
      <Image
        h={"70px"}
        src={logocompleto}
        alt="del Castillo & Asociados logo"
      />
      <HStack
        justify={"space-between"}
        width={"274.44px"}
        marginRight={"15px "}
      >
        <Box
          as="button"
          h={"40px"}
          width={"100px"}
          borderRadius={"md"}
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
          borderRadius={"md"}
          border={"1px"}
          borderColor={"#cdbf7b"}
        >
          <Link to={"/signup"}>
            <Text color={"#78499b"}>Sign up</Text>
          </Link>
        </Box>
      </HStack>
    </HStack>
  );
};

export default HomeNavBar;
