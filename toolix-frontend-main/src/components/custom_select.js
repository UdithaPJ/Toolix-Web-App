import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function CustomSelect({ label, value, onChange, options = [] }) {
  return (
    <div
      style={{
        width: 300,
        marginLeft: 20,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
      }}
    >
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={(e) => onChange(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: {
                width: 300,
              },
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem style={{ width: 300 }} key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
