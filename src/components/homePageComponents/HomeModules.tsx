import { Box, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomeModules = () => {
  const navigate = useNavigate();
  const handleClick = (route: String) => {
    navigate(`/${route}`);
  };

  return (
    <Box
      maxHeight="100%"
      overflow="auto"
      padding={"20px"}
      h={"100%"}
      display={"flex"}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      border={"1px"}
      borderColor={"#C0B168"}
      borderRadius={10}
      m={"15px"}
    >
      <HStack justify={"space-between"} h={"100%"} align={"center"} w={"100%"}>
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
      <HStack justify={"space-between"} h={"100%"} align={"center"} w={"100%"}>
        <Box
          as="button"
          h={"70%"}
          w={"25%"}
          color={"#633388"}
          borderRadius={20}
          border={"1px"}
          borderColor={"#C2B369"}
          onClick={() => handleClick("appointments")}
        >
          Appointments
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
        ></Box>
        <Box
          as="button"
          h={"70%"}
          w={"25%"}
          color={"#633388"}
          borderRadius={20}
          border={"1px"}
          borderColor={"#C2B369"}
          onClick={() => handleClick("users")}
        ></Box>
      </HStack>
    </Box>
  );
};

export default HomeModules;
