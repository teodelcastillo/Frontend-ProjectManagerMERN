import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { useLogout } from "../../hooks/usersHooks/useLogout";

const NavBarMenu = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavBarMenu;
