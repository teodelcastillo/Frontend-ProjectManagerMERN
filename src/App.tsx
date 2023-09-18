// App.tsx
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import CasesGrid from "./components/CasesGrid";
import { useState } from "react";
import { Clients } from "./data/models";

function App() {
  // State for selected client and search text
  const [selectedClient, setSelectedClient] = useState<Clients | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  // Function to handle client selection
  const handleClientSelection = (client: Clients) => {
    setSelectedClient(client);
  };

  // Function to handle search text change
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "main main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <GridItem area="nav">
          <NavBar
            selectedClient={selectedClient}
            onClientSelect={handleClientSelection}
            onSearch={handleSearchTextChange}
          />
        </GridItem>

        <GridItem area="main" padding={"15px"}>
          <CasesGrid selectedClient={selectedClient} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
