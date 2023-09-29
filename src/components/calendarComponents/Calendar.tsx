import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface CalendarProps {
  currentDate: Dayjs;
}

const CustomCalendar: React.FC<CalendarProps> = ({ currentDate }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const renderCalendar = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const daysInMonth = endOfMonth.date();

    const daysArray = Array.from({ length: daysInMonth }, (_, index) =>
      startOfMonth.add(index, "day")
    );

    return (
      <div>
        <h2>{currentDate.format("MMMM YYYY")}</h2>
        <div>
          {daysArray.map((day) => (
            <div
              key={day.toString()}
              onClick={() => handleDateClick(day)}
              className={`day ${
                selectedDate?.isSame(day, "day") ? "selected" : ""
              }`}
            >
              {day.format("D")}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleDateClick = (date: Dayjs) => {
    setSelectedDate(date);
    // You can perform actions when a date is clicked here
  };

  return <div className="calendar">{renderCalendar()}</div>;
};

export default CustomCalendar;
