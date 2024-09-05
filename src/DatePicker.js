import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];

    // Get the first day of the current month
    const firstDayOfMonth = new Date(year, month, 1);
    // Get the last day of the current month
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Calculate the days from the previous month to display in the calendar
    const lastDayOfPrevMonth = new Date(year, month, 0);
    const daysInPrevMonth = lastDayOfPrevMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Add the days from the previous month
    for (
      let i = daysInPrevMonth - firstDayOfWeek + 1;
      i <= daysInPrevMonth;
      i++
    ) {
      days.push(new Date(year, month - 1, i));
    }

    // Add the days of the current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add the days of the next month to fill the calendar
    const remainingDays = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const handleDayClick = (day) => {
    if (startDate && endDate) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    if (!startDate || day < startDate) {
      setStartDate(day);
      setEndDate(null);
    } else {
      setEndDate(day);
    }
  };

  const handleMonthChange = (offset) => {
    if (offset < 0) {
      // Disabling the previous month navigation
      return;
    }
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    );
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <div className="datepicker">
      <div className="header">
        <button className="month-select" onClick={() => handleMonthChange(-1)}>
          {"<"}
        </button>
        <span>
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button className="month-select" onClick={() => handleMonthChange(1)}>
          {">"}
        </button>
      </div>
      <div className="days">
        {days.map((day) => {
          const isToday = day.toDateString() === today.toDateString();
          const isInRange =
            startDate && endDate && day >= startDate && day <= endDate;
          const isActive =
            startDate && day.toDateString() === startDate.toDateString();
          const isNonCurrentMonth = day.getMonth() !== currentDate.getMonth();

          let className = "day-button";
          if (isNonCurrentMonth) className += " non-current-month";
          if (isToday) className += " today";
          if (isActive) className += " active";
          if (isInRange) className += " active";

          return (
            <button
              key={day}
              data-testid={`day-${day.getDate()}`}
              className={className}
              onClick={() => !isNonCurrentMonth && handleDayClick(day)}
              disabled={isNonCurrentMonth}>
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;
