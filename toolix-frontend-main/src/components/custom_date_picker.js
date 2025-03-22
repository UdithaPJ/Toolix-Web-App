import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CustomDatePicker({ label, value, onChange, ...props }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          format="YYYY - MM - DD"
          value={value}
          onChange={(value) => onChange(value)}
          {...props}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
