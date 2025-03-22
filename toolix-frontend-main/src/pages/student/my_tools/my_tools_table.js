import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { BORROW_STATUSES } from "../../../constants/enums";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/table_styled_components";
import { getDateValue } from "../../../utils/common_utils";

export default function MyToolsTable({ history }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ minWidth: 100 }}>
              Tool name
            </StyledTableCell>
            <StyledTableCell>Tool description</StyledTableCell>
            <StyledTableCell>Due date</StyledTableCell>
            <StyledTableCell style={{ width: 220 }} align="center">
              Status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.length > 0 ? (
            history.map((row) => {
              return (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.tool.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.tool.description}</StyledTableCell>
                  <StyledTableCell>{getDateValue(row.dueDate)}</StyledTableCell>
                  <StyledTableCell align="center">
                    <div
                      style={{
                        color:
                          row.status === BORROW_STATUSES.APPROVED
                            ? "green"
                            : row.status === BORROW_STATUSES.REJECTED
                            ? "red"
                            : row.status === BORROW_STATUSES.REQUESTED
                            ? "blue"
                            : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      {row.status}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={100}>
                <div
                  style={{
                    textAlign: "center",
                    padding: 20,
                    fontSize: 18,
                  }}
                >
                  No history available
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
