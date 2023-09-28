import { Grid, GridItem } from "@chakra-ui/react";
import HomeNavbar from "../components/homePageComponents/HomeNavBar";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import DashboardAside from "./DashboardAside";
import { Clients } from "../data/models";

interface LayoutProps {
  children: ReactNode;
}

interface Props {
  onSearch: (searchText: string) => void;
  onClientSelect: (client: Clients) => void;
  maxClientsToShow: number;
}

const Layout = ({ children }: LayoutProps, { onSearch }: Props) => {
  // Get the current location (route)
  const location = useLocation();

  // Define a mapping of routes to corresponding nav components
  const navComponents: { [key: string]: React.ReactNode } = {
    "/dashboard": (
      <DashboardAside onSearch={onSearch} onClientSelect={() => {}} />
    ),
    "/calendar": "aside",
    // Add more routes and corresponding components as needed
  };

  // Determine the nav component to render based on the route
  const currentNavComponent = navComponents[location.pathname];

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={"80px 1fr 70px"}
      gridTemplateColumns={"350px 1fr"}
      gap="1"
      height={"100vh"}
    >
      <GridItem p="2" area={"header"}>
        <HomeNavbar />
      </GridItem>
      <GridItem p="2" area={"nav"}>
        {currentNavComponent || null}
      </GridItem>

      <GridItem p="2" area={"main"}>
        {children}
      </GridItem>
      <GridItem p="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default Layout;
