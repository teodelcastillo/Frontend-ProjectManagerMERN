import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Text,
  Center,
  Tag,
  TagCloseButton,
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import CaseCard from "./CaseCard";
import { useGetAllCases } from "../hooks/caseHooks/useGetAllCases";
import { Case } from "../data/models";

function CaseGrid() {
  const { fetchAllCases } = useGetAllCases();

  const [casesToShow, setCasesToShow] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Call fetchAllCases with empty parameters to get all cases
        const cases = await fetchAllCases(
          "", // caseClientID
          "", // caseName
          "", // caseID
          "", // caseClient
          "", // caseNumber
          "", // caseJury
          "" // caseLink
        );
        setCasesToShow(cases);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cases:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchAllCases]);

  const handleCaseSearch = () => {
    // Implement your search functionality here
    setSearchText(searchText);
  };

  const handleTagClose = () => {
    // Implement closing the search tag here
    setSearchText("");
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
        {casesToShow.map((caseItem: Case) => (
          <CaseCard key={caseItem._id} caseData={caseItem} />
        ))}
        {/* Implement the load more button */}
      </SimpleGrid>
    </div>
  );
}

export default CaseGrid;
