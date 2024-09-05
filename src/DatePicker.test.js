import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DatePicker from "./DatePicker";

describe("DatePicker Component", () => {
  test("renders DatePicker with current month and year", () => {
    render(<DatePicker />);
    const header = screen.getByText(/2024年9月/i);
    expect(header).toBeInTheDocument();
  });

  test("should allow clicking on current month days", () => {
    render(<DatePicker />);
    const clickDay = screen.getByTestId("day-10");
    fireEvent.click(clickDay);
    expect(clickDay).toHaveClass("active");
  });

  test("clicked prev day should change the startDate", () => {
    render(<DatePicker />);
    const currentDay = screen.getByTestId("day-10"); // 根據當前月份和年份調整
    const prevMonthDay = screen.getByTestId("day-9"); // 根據當前月份和年份調整
    fireEvent.click(currentDay);
    fireEvent.click(prevMonthDay);
    expect(prevMonthDay).toHaveClass("active");
    expect(currentDay).not.toHaveClass("active");
  });
});
