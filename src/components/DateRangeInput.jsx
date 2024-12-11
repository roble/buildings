import PropTypes from "prop-types";
import { useState } from "react";
import { Calendar } from "primereact/calendar";

const DateRangeInput = ({ onSelect, value }) => {
  const [dates, setDates] = useState(value);

  const now = new Date();
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const handleChange = (e) => {
    setDates(e.value);
    onSelect(e.value);
  };

  return (
    <div className={`search-input ${value ? "active" : ""}`}>
      <label>Data range</label>
      <Calendar
        value={dates}
        onChange={handleChange}
        selectionMode="range"
        readOnlyInput
        placeholder="Select a date range..."
        numberOfMonths={2}
        maxDate={now}
        viewDate={firstDayLastMonth}
        dateFormat="dd/mm/yy"
        showIcon
        icon={() => <i className="pi pi-chevron-down" />}
      />
    </div>
  );
};

DateRangeInput.propTypes = {
  onSelect: PropTypes.func,
  value: PropTypes.array,
};

export default DateRangeInput;
