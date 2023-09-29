// FilterLabel.tsx

import { Tag, TagCloseButton } from "@chakra-ui/react";
import { Clients } from "../data/models";

interface FilterLabelProps {
  selectedClient: Clients | null;
  onClearFilter: () => void;
}

const FilterLabel = ({ selectedClient, onClearFilter }: FilterLabelProps) => {
  if (!selectedClient) {
    return null;
  }

  const handleClearFilter = () => {
    onClearFilter();
  };

  return (
    <Tag fontSize="0.8em">
      {selectedClient.clientName} <TagCloseButton onClick={handleClearFilter} />
    </Tag>
  );
};

export default FilterLabel;
