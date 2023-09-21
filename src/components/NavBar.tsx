import ClientsSearch from "./ClientsSearch";
import { HStack } from "@chakra-ui/react";
import { Clients } from "../data/models";
import FilterLabel from "./FilterLabel";

interface NavBarProps {
  selectedClient: Clients | null;
  onClientSelect: (client: Clients | null) => void; // Updated type for onClientSelect
  onSearch: (searchText: string) => void;
}

const NavBar = ({ selectedClient, onClientSelect, onSearch }: NavBarProps) => {
  const handleClearFilter = () => {
    onClientSelect(null);
  };

  return (
    <HStack padding="10px">
      {" "}
      <ClientsSearch onClientSelect={onClientSelect} onSearch={onSearch} />
      <FilterLabel
        selectedClient={selectedClient}
        onClearFilter={handleClearFilter}
      />
    </HStack>
  );
};

export default NavBar;
