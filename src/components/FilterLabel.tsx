// FilterLabel.tsx
import React from "react";
import { Tag, TagCloseButton } from "@chakra-ui/react";
import { Clients } from "../data/models";

interface FilterLabelProps {
  selectedClient: Clients | null;
  onClearFilter: () => void;
}

const FilterLabel = ({ selectedClient, onClearFilter }: FilterLabelProps) => {
  if (!selectedClient) {
    return null; // Early return when no client is selected
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
