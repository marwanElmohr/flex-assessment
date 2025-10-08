import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function Home() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const formattedRange =
    startDate && endDate
      ? `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`
      : startDate
      ? `${format(startDate, "MMM d")} -`
      : "Dates";

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => setDateRange(update)}
      dateFormat="MMM d"
      placeholderText="Dates"
      className="bg-transparent focus:outline-none cursor-pointer pl-2"
      customInput={
        <span className="bg-transparent cursor-pointer">{formattedRange}</span>
      }
    />
  );
}
