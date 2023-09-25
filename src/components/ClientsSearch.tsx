import { useRef, useState, useEffect } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import { Clients } from "../data/models";
import { useGetAllClients } from "../hooks/clientHooks/useGetAllClients"; // Import your hook

interface Props {
  onClientSelect: (client: Clients) => void;
  maxClientsToShow: number;
}

const ClientsSearch = ({ onClientSelect, maxClientsToShow }: Props) => {
  const { fetchAllClients } = useGetAllClients();
  const [clients, setClients] = useState<Clients[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const filteredClients = clients.filter((client) =>
    client.clientName.toLowerCase().includes(searchText.toLowerCase())
  );

  const clientsToRender = filteredClients.slice(0, maxClientsToShow);

  const [resetList, setResetList] = useState(false);

  const handleClientClick = (client: Clients) => {
    setResetList(true);
    onClientSelect(client);
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedClients = await fetchAllClients();
        setClients(fetchedClients);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchAllClients]);

  useEffect(() => {
    if (resetList) {
      setSearchText("");
      setResetList(false);
    }
  }, [resetList]);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <>
      <HStack padding="10px">
        <Button
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
          aria-label="Open Client List"
        >
          Clients
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="sm"
          aria-label="Client List Drawer"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Clients list</DrawerHeader>
            <SearchInput
              onSearch={handleSearch}
              placeholder="Search Clients by Name"
              label="Search Clients" // Label for search input
            />

            <DrawerBody>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <List spacing={2}>
                  {clientsToRender.map((client) => (
                    <ListItem key={client._id}>
                      <Button onClick={() => handleClientClick(client)}>
                        {client.clientName}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </HStack>
    </>
  );
};

export default ClientsSearch;
