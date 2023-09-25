import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Text,
  Center,
  Tag,
  TagCloseButton,
  Button, // Import Button component from Chakra UI
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
  const [limit, setLimit] = useState(8); // Initial limit

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const cases = await fetchAllCases("", "", "", "", "", "", "");
        setCasesToShow(cases); // Set all cases initially
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cases:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchAllCases]);

  const handleCaseSearch = () => {
    setSearchText(searchText);
  };

  const handleTagClose = () => {
    setSearchText("");
  };

  const loadMoreCases = () => {
    // Increase the limit by 6 to load more cases
    setLimit(limit + 6);
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
        {casesToShow.slice(0, limit).map((caseItem: Case) => (
          <CaseCard key={caseItem._id} caseData={caseItem} />
        ))}
      </SimpleGrid>

      {limit < casesToShow.length && (
        <Center mt="4">
          <Button onClick={loadMoreCases}>Load More</Button>
        </Center>
      )}
    </div>
  );
}

export default CaseGrid;
