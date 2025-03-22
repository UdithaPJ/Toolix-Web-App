import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
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
import { showDialog } from "../../../components/dialog";
import { deleteToolApi } from "../../../api/admin_api";
import UpdateToolModal from "./update_tool_modal";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/table_styled_components";

export default function ToolsTable({ tools, refetch }) {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState(null);
  const onDeleteTool = async (toolId) => {
    try {
      await deleteToolApi(toolId);
      showDialog({
        title: "Info",
        subtitle:
          "You have successfully deleted a tool and it will be not accessible.",
        buttons: [{}],
      });
      refetch();
    } catch (error) {}
  };

  const deleteToolConfirmation = (toolId) => {
    showDialog({
      title: "Are you sure?",
      subtitle: "This action will permanently delete this tool",
      buttons: [
        { title: "Cancel", color: "inherit" },
        {
          title: "Delete",
          color: "error",
          onClick: () => onDeleteTool(toolId),
        },
      ],
    });
  };

  const goToHistory = (toolId) => {
    navigate(routes.ADMIN.TOOL_HISTORY(toolId));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ minWidth: 100 }}>
              Tool name
            </StyledTableCell>
            <StyledTableCell>Tool description</StyledTableCell>
            <StyledTableCell align="center">Availability</StyledTableCell>
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
                    {row.availability}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="View item history">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => goToHistory(row._id)}
                        style={{ marginRight: 3 }}
                      >
                        <RemoveRedEye fontSize="small" />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Edit tool">
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => setSelectedTool(row)}
                        style={{ marginRight: 3 }}
                      >
                        <Edit fontSize="small" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete tool">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteToolConfirmation(row._id)}
                      >
                        <Delete fontSize="small" />
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
      <UpdateToolModal
        open={!!selectedTool}
        tool={selectedTool}
        refetch={refetch}
        setOpen={() => setSelectedTool(null)}
      />
    </TableContainer>
  );
}
