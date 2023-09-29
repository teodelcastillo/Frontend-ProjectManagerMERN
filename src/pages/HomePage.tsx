import { Grid, GridItem } from "@chakra-ui/react";
import HomeModules from "../components/homePageComponents/HomeModules";
import AppointmentsList from "../components/homePageComponents/AppointmentsList";

const HomePage = () => {
  return (
    <Grid templateColumns="40% 1fr" gap={4} h={"80vh"}>
      <GridItem h="100%">
        <AppointmentsList />
      </GridItem>
      <GridItem h="100%">
        <HomeModules />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
