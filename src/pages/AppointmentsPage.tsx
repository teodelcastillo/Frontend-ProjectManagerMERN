import { Grid, GridItem } from "@chakra-ui/react";

import AppointmentsList from "../components/homePageComponents/AppointmentsList";

import CreateAppointment from "../components/AppointmentComponents/CreateAppointment";

const AppointmentsPage = () => {
  return (
    <Grid templateColumns="20% 1fr" gap={2} h="85vh">
      <GridItem h="100%">
        <CreateAppointment />
      </GridItem>
      <GridItem>
        <AppointmentsList />
      </GridItem>
    </Grid>
  );
};

export default AppointmentsPage;
