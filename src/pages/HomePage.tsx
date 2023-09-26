import { Grid, GridItem } from "@chakra-ui/react";
import HomeNavBar from "../components/homePageComponents/HomeNavBar";
import HomeModules from "../components/homePageComponents/HomeModules";
import HomeFooter from "../components/homePageComponents/HomeFooter";

const HomePage = () => {
  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
        gridTemplateRows={"90px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"header"}>
          <HomeNavBar />;
        </GridItem>
        <GridItem pl="2" area={"main"} h={"70vh"}>
          <HomeModules />
        </GridItem>
        <GridItem pl="2" area={"footer"} h={"90px"}>
          <HomeFooter />
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;
