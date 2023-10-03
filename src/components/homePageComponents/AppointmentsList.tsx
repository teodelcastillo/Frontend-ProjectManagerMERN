import { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Alert,
  AlertTitle,
  AlertDescription,
  List,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { useGetAllAppointments } from "../../hooks/appointmentsHooks/useGetAllAppointments";
import { Appointment } from "../../data/models";

const AppointmentsList = () => {
  const { fetchAllAppointments } = useGetAllAppointments();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const fetchedAppointments = await fetchAllAppointments();
        setAppointments(fetchedAppointments);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setIsLoading(false);
      }
    };

    getAppointments();
  }, [fetchAllAppointments]);

  // Function to format a date as a string in "DD/MM HH:MM" format
  const formatDateTime = (date: Date | undefined) => {
    if (date && !isNaN(date.getTime())) {
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleString("es-AR", options);
    }
    return ""; // Return an empty string if date is undefined or invalid
  };

  // Function to calculate the difference in days between two dates
  const calculateDaysDifference = (date: Date) => {
    const currentDate = new Date();
    const appointmentDate = new Date(date);

    // Calculate the difference in days
    const timeDifference = appointmentDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
  };

  // Sort appointments by priority
  const sortedAppointments = appointments.slice().sort((a, b) => {
    const daysDifferenceA = calculateDaysDifference(new Date(a.date));
    const daysDifferenceB = calculateDaysDifference(new Date(b.date));

    if (daysDifferenceA < 0) {
      return -1;
    } else if (daysDifferenceB < 0) {
      return 1;
    } else if (daysDifferenceA <= 3 && daysDifferenceB <= 3) {
      return 0;
    } else if (daysDifferenceA <= 3) {
      return -1;
    } else if (daysDifferenceB <= 3) {
      return 1;
    } else if (daysDifferenceA <= 6 && daysDifferenceB <= 6) {
      return 0;
    } else if (daysDifferenceA <= 6) {
      return -1;
    } else if (daysDifferenceB <= 6) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <Box
      maxHeight="800px"
      padding={"20px"}
      h={"100%"}
      display={"flex"}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      border={"1px"}
      borderColor={"#C0B168"}
      borderRadius={10}
      m={"15px"}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Box position="relative" padding="10" width={"100%"}>
            <AbsoluteCenter px="4">VENCIMIENTOS</AbsoluteCenter>
          </Box>

          <List spacing={3} w={"100%"} h={"100%"} overflow={"auto"}>
            {sortedAppointments.map((appointment) => {
              const daysDifference = calculateDaysDifference(
                new Date(appointment.date)
              );

              let colorScheme = "green";

              if (daysDifference < 0) {
                colorScheme = "red";
              } else if (daysDifference <= 3) {
                colorScheme = "yellow";
              }

              const formattedDate = formatDateTime(new Date(appointment.date));

              return (
                <Alert
                  key={appointment._id}
                  colorScheme={colorScheme}
                  justifyContent={"space-between"}
                >
                  <Box>
                    <AlertTitle>{appointment.title}</AlertTitle>
                    <AlertDescription>{formattedDate}</AlertDescription>
                  </Box>
                  <AlertDescription>{appointment.description}</AlertDescription>
                </Alert>
              );
            })}
          </List>
        </>
      )}
    </Box>
  );
};

export default AppointmentsList;
