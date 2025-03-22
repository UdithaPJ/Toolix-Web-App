import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import RequestToolModal from "./request_tool_modal";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/table_styled_components";

export default function StudentRequestToolsTable({ tools, refetch }) {
  const [toolId, setToolId] = useState(null);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ minWidth: 100 }}>
              Tool name
            </StyledTableCell>
            <StyledTableCell>Tool description</StyledTableCell>
            <StyledTableCell style={{ width: 220 }} align="center">
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tools.length > 0 ? (
            tools.map((row) => {
              return (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="Request this tool">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => setToolId(row._id)}
                        style={{ marginRight: 3 }}
                      >
                        Request tool
                      </Button>
                    </Tooltip>
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
                  No tools available
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <RequestToolModal
        refetch={refetch}
        open={!!toolId}
        setOpen={setToolId}
        toolId={toolId}
      />
    </TableContainer>
  );
}
