import { Box, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom

const HomeModules = () => {
  const navigate = useNavigate();
  const handleClick = (route: String) => {
    navigate(`/${route}`);
  };

  return (
    <HStack
      justify={"space-between"}
      padding={"50px"}
      h={"100%"}
      align={"center"}
    >
      <Box
        as="button"
        h={"70%"}
        w={"25%"}
        color={"#633388"}
        borderRadius={20}
        border={"1px"}
        borderColor={"#C2B369"}
        onClick={() => handleClick("dashboard")}
      >
        Dashboard
      </Box>
      <Box
        as="button"
        h={"70%"}
        w={"25%"}
        color={"#633388"}
        borderRadius={20}
        border={"1px"}
        borderColor={"#C2B369"}
        onClick={() => handleClick("calendar")}
      >
        Calendar
      </Box>
      <Box
        as="button"
        h={"70%"}
        w={"25%"}
        color={"#633388"}
        borderRadius={20}
        border={"1px"}
        borderColor={"#C2B369"}
        onClick={() => handleClick("users")}
      >
        Users
      </Box>
    </HStack>
  );
};

export default HomeModules;
