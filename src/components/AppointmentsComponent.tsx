import useAppointments from "../hooks/useAppointments"; // Import your useAppointments hook

const AppointmentsComponent = () => {
  const { appointments, isLoading, error } = useAppointments();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>Description: {appointment.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsComponent;
