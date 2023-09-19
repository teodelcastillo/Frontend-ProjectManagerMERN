import React, { useState, useEffect, useMemo } from "react";
import useDataFetching from "../hooks/useData";
import {
  SimpleGrid,
  Button,
  Center,
  Text,
  Tag,
  TagCloseButton,
} from "@chakra-ui/react";
import CaseCard from "./CaseCard";
import { Case, Clients } from "../data/models";
import { SmallAddIcon } from "@chakra-ui/icons";
import SearchInput from "./SearchInput";

interface CasesGridProps {
  selectedClient: Clients | null;
}

const CasesGrid: React.FC<CasesGridProps> = ({ selectedClient }) => {
  const endpoint = selectedClient
    ? `/cases?caseClientID=${selectedClient["_id"]}`
    : "/cases";

  const { data: allCases, isLoading } = useDataFetching<Case>(endpoint);

  const [searchText, setSearchText] = useState<string>(""); // State for search text
  const limit: number = 11; // Limit of cases per page
  const [casesToDisplay, setCasesToDisplay] = useState<number>(limit);
  const handleTagClose = () => {
    setSearchText("");
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // Calculate the range of cases to display based on the current number of cases to display
    setCasesToDisplay(limit);
  }, [selectedClient, allCases, searchText, isLoading]);

  const handleCaseSearch = (searchText: string) => {
    setSearchText(searchText);
    setCasesToDisplay(limit); // Reset cases to display when performing a new search
  };

  const filteredCases: Case[] = useMemo(() => {
    if (searchText) {
      // Filter cases by name similarity to search text
      return allCases.filter((caseItem) =>
        caseItem.caseName.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (selectedClient) {
      // Filter cases by selected "Client-ID"
      return allCases.filter(
        (caseItem) => caseItem.caseClientID === selectedClient._id
      );
    } else {
      // If no client is selected and no search is performed, show all cases
      return allCases;
    }
  }, [selectedClient, allCases, searchText]);

  // Calculate the range of cases to display based on the current number of cases to display
  const casesToShow: Case[] = filteredCases.slice(0, casesToDisplay);

  const handleLoadMore = () => {
    // Increase the number of cases to display by the limit value
    setCasesToDisplay(casesToDisplay + limit);
  };

  return (
    <div>
      <SearchInput onSearch={handleCaseSearch} placeholder="Search Cases..." />
      {searchText !== "" && (
        <Tag fontSize={"0.8rem"}>
          {searchText}
          <TagCloseButton onClick={handleTagClose} />
        </Tag>
      )}

      {isLoading && (
        <Center mt="4">
          <Text>Loading...</Text>
        </Center>
      )}

      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} padding="10px" spacing={10}>
        {casesToShow.map((caseItem) => (
          <CaseCard key={caseItem._id} caseData={caseItem} />
        ))}
        {filteredCases.length > casesToDisplay && (
          <Center>
            <Button
              as="button"
              borderRadius="xl"
              px={4}
              borderWidth="1px"
              minHeight={277.8}
              onClick={handleLoadMore}
            >
              <SmallAddIcon boxSize={6} /> Load More
            </Button>
          </Center>
        )}
      </SimpleGrid>
    </div>
  );
};

export default CasesGrid;
