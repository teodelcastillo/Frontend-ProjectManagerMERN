import { Case } from "../../data/models";
import { useEffect, useRef, useState } from "react";
import { useGetAllCases } from "../../hooks/caseHooks/useGetAllCases";
import {
  Button,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import SearchInput from "../SearchInput";

interface CaseSelectProps {
  onSelect: (selectedCase: Case) => void;
  maxCasesToShow: number;
}

const CaseSelect = ({ onSelect, maxCasesToShow }: CaseSelectProps) => {
  const { fetchAllCases } = useGetAllCases();
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const fetchedCases = await fetchAllCases(
        "", // caseClientID
        "", // caseName
        "", // caseID
        "", // caseClient
        "", // caseNumber
        "", // caseJury
        "", // caseLink
        [] // appointments
      );
      setCases(fetchedCases);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cases:", error);
      setIsLoading(false);
    }
  };

  const filteredCases = cases.filter((caseItem) =>
    caseItem.caseName.toLowerCase().includes(searchText.toLowerCase())
  );

  const truncateString = (str: string, maxLength: number) => {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + "...";
    }
  };

  // Calculate the range of cases to display based on the current number of cases to display

  const casesToRender = filteredCases.slice(0, maxCasesToShow);

  const handleCaseClick = (caseItem: Case) => {
    onSelect(caseItem);
    onClose();
  };

  useEffect(() => {
    fetchData();
  }, [fetchAllCases]);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleCaseSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCase(event.target.value);
    const selectedCaseObject = cases.find(
      (caseItem) => caseItem._id === event.target.value
    );
    if (selectedCaseObject) {
      onSelect(selectedCaseObject);
    }
  };

  return (
    <>
      <Button mt={3} ref={btnRef} onClick={onOpen}>
        Causas
      </Button>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={"inside"}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Listado de causas</ModalHeader>
          <ModalCloseButton />
          <SearchInput onSearch={handleSearch} />
          <ModalBody>
            <List spacing={3} flexDirection={"column"}>
              {casesToRender.map((caseItem) => (
                <ListItem
                  key={caseItem._id}
                  as={Button}
                  maxH={"48px"}
                  display={"block"}
                  onClick={() => handleCaseClick(caseItem)}
                >
                  {truncateString(caseItem.caseName, 50)}
                </ListItem>
              ))}
            </List>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CaseSelect;
