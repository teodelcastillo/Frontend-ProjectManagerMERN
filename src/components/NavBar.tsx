import ClientsSearch from "./ClientsSearch";
import {
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Clients } from "../data/models";
import FilterLabel from "./FilterLabel";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useLogout } from "../hooks/usersHooks/useLogout";

interface NavBarProps {
  selectedClient: Clients | null;
  onClientSelect: (client: Clients | null) => void; // Updated type for onClientSelect
  onSearch: (searchText: string) => void;
}

const NavBar = ({ selectedClient, onClientSelect, onSearch }: NavBarProps) => {
  const handleClearFilter = () => {
    onClientSelect(null);
  };

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <HStack padding="10px">
      {" "}
      <ClientsSearch onClientSelect={onClientSelect} onSearch={onSearch} />
      <FilterLabel
        selectedClient={selectedClient}
        onClearFilter={handleClearFilter}
      />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem>
            <Button onClick={handleLogout}>Log out</Button>
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default NavBar;
