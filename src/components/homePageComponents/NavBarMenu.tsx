import { HamburgerIcon } from "@chakra-ui/icons";
import { HStack, Button } from "@chakra-ui/react";

import { useLogout } from "../../hooks/usersHooks/useLogout";
import { Link } from "react-router-dom";

const NavBarMenu = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <HStack justify={"space-between"}>
      <Link to={"dashboard"}>Dashboard</Link>
      <Link to={"appointments"}>Vencimientos</Link>
      <Link to={"calendar"}>Calendario</Link>
      <Button onClick={handleLogout}>Log out</Button>
    </HStack>
  );
};

export default NavBarMenu;
