import { List, ListItem, Button, Text } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import { useState, useEffect } from "react";
import { Clients } from "../data/models";
import { useGetAllClients } from "../hooks/clientHooks/useGetAllClients";

interface Props {
  onSearch: (searchText: string) => void;
  onClientSelect: (client: Clients) => void;
}

const DashboardAside = ({ onSearch, onClientSelect }: Props) => {
  const { fetchAllClients } = useGetAllClients();
  const [clients, setClients] = useState<Clients[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [resetList, setResetList] = useState(false);
  const [visibleClients, setVisibleClients] = useState(10); // Number of visible clients

  const handleClientClick = (client: Clients) => {
    setResetList(true);
    onClientSelect(client);
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

  // Function to filter clients based on search text
  const searchClients = (text: string) => {
    const filteredClients = clients.filter((client) =>
      client.clientName.toLowerCase().includes(text.toLowerCase())
    );
    return filteredClients;
  };

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
    onSearch(searchText); // Call the onSearch callback with the search text
    setVisibleClients(10); // Reset the visible clients to 10 when a new search is performed
  };

  const filteredClients = searchClients(searchText);
  const clientsToRender = filteredClients.slice(0, visibleClients);

  const handleLoadMore = () => {
    setVisibleClients((prevVisibleClients) => prevVisibleClients + 10);
  };

  return (
    <>
      <SearchInput onSearch={handleSearch} placeholder="Clientes" />
      {searchText !== "" && !isLoading ? (
        <>
          <List spacing={2}>
            {clientsToRender.map((client) => (
              <ListItem key={client._id}>
                <Button onClick={() => handleClientClick(client)}>
                  {client.clientName}
                </Button>
              </ListItem>
            ))}
          </List>
          {visibleClients < filteredClients.length && (
            <Text
              mt={2}
              textAlign="start"
              color="blue"
              cursor="pointer"
              onClick={handleLoadMore}
            >
              Load More
            </Text>
          )}
        </>
      ) : null}
    </>
  );
};

export default DashboardAside;
