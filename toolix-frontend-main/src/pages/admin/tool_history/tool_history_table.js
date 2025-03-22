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
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/table_styled_components";
import { getDateValue } from "../../../utils/common_utils";

export default function ToolHistoryTable({ history }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Requested by</StyledTableCell>
            <StyledTableCell>Requested date</StyledTableCell>
            <StyledTableCell>Approved by</StyledTableCell>
            <StyledTableCell>Approved date</StyledTableCell>
            <StyledTableCell>Rejected by</StyledTableCell>
            <StyledTableCell>Rejected date</StyledTableCell>
            <StyledTableCell>Collected by</StyledTableCell>
            <StyledTableCell>Collected date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.length > 0 ? (
            history.map((row) => {
              return (
                <StyledTableRow key={row.name}>
                  <StyledTableCell>{row.student.name}</StyledTableCell>
                  <StyledTableCell>
                    {getDateValue(row.requestedDate)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.approvedBy?.name || "--"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {getDateValue(row.approvedDate)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.rejectedBy?.name || "--"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {getDateValue(row.rejectedDate)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.collectedBy?.name || "--"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {getDateValue(row.collectedDate)}
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
