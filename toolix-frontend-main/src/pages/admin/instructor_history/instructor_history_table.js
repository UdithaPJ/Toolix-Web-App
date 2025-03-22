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


export default function AdminInstructorHistoryTable({ history, instructorId }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tool name</StyledTableCell>
            <StyledTableCell>Involved history</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.length > 0 ? (
            history.map((row) => {
              const isApproved = row.approvedBy?._id === instructorId;
              const isRejected = row.rejectedBy?._id === instructorId;
              const isCollected = row.collectedBy?._id === instructorId;

              return (
                <StyledTableRow key={row.name}>
                  <StyledTableCell>{row.tool.name}</StyledTableCell>
                  <StyledTableCell>
                    <div>
                      {isApproved && (
                        <div>{`Checkout request approved on ${getDateValue(
                          row.approvedDate
                        )}`}</div>
                      )}
                      {isRejected && (
                        <div>{`Checkout request rejected on ${getDateValue(
                          row.rejectedDate
                        )}`}</div>
                      )}
                      {isCollected && (
                        <div>{`Item checked in on ${getDateValue(
                          row.collectedDate
                        )}`}</div>
                      )}
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
