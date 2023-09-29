import { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import CustomCalendar from "../components/calendarComponents/Calendar";
import dayjs from "dayjs"; // Import dayjs

const FullCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs()); // Initialize with the current date as a dayjs object

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => prevDate.add(1, "month")); // Use dayjs methods for date manipulation
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => prevDate.subtract(1, "month")); // Use dayjs methods for date manipulation
  };

  return (
    <Grid
      templateAreas={`"header header"
               "nav main"`}
      gridTemplateRows={"50px 1fr"}
      gridTemplateColumns={"150px 1fr"}
      h="80vh"
      gap="1"
    >
      <GridItem pl="2" bg="orange.300" area={"header"}>
        Header
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"}>
        <button onClick={handlePreviousMonth}>Previous Month</button>
        <span>{currentDate.format("MMMM YYYY")}</span>
        <button onClick={handleNextMonth}>Next Month</button>
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        <CustomCalendar currentDate={currentDate} />
      </GridItem>
    </Grid>
  );
};

export default FullCalendar;
