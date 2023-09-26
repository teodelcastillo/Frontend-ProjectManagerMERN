import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetAllAppointments } from "../hooks/appointmentsHooks/useGetAllAppointments";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarComponent() {
  const [value, onChange] = useState<Value>(new Date());
  const { fetchAllAppointments } = useGetAllAppointments();
  const [appointments, setAppointments] = useState<Date[]>([]); // Change to Date[]

  useEffect(() => {
    fetchAllAppointments().then((appointmentsData) => {
      // Assuming your appointments have a 'date' field
      const appointmentDates = appointmentsData.map(
        (appointment) => new Date(appointment.date)
      );
      setAppointments(appointmentDates);
    });
  }, [fetchAllAppointments]);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      // Check if the date is in the list of appointments
      if (
        appointments.some(
          (appointmentDate) =>
            date.toDateString() === appointmentDate.toDateString()
        )
      ) {
        return <div style={{ backgroundColor: "red" }}></div>; // Highlight with red color
      }
    }
    return null;
  };

  return (
    <Calendar onChange={onChange} value={value} tileContent={tileContent} />
  );
}

export default CalendarComponent;
