import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { showDialog } from "../dialog";
import { updateBorrowApi } from "../../api/admin_api";

import { BORROW_STATUSES } from "../../constants/enums";
import { StyledTableCell, StyledTableRow } from "../table_styled_components";
import { getDateValue } from "../../utils/common_utils";
import ApproveRequestModal from "./approve_request_modal";

export default function BorrowingsTable({ borrows, refetch, status }) {
  const isRequested = status === BORROW_STATUSES.REQUESTED;
  const isApproved = status === BORROW_STATUSES.APPROVED;
  const isRejected = status === BORROW_STATUSES.REJECTED;
  const isReturned = status === BORROW_STATUSES.RETURNED;

  const [approveRequest, setApproveRequest] = useState(null);

  const onRejectBorrow = async (borrowId) => {
    try {
      await updateBorrowApi(borrowId, { status: BORROW_STATUSES.REJECTED });
      showDialog({
        title: "Info",
        subtitle:
          "You have successfully rejected the tool request.",
        buttons: [{}],
      });
      refetch();
    } catch (error) {}
  };

  const onCollectBorrow = async (borrowId) => {
    try {
      await updateBorrowApi(borrowId, { status: BORROW_STATUSES.RETURNED });
      showDialog({
        title: "Info",
        subtitle: "You have successfully collected the tool",
        buttons: [{}],
      });
      refetch();
    } catch (error) {}
  };

  const rejectBorrowRequest = (borrowId) => {
    showDialog({
      title: "Are you sure?",
      subtitle: "This action will permanently reject this request",
      buttons: [
        { title: "Cancel", color: "inherit" },
        {
          title: "Reject",
          color: "error",
          onClick: () => onRejectBorrow(borrowId),
        },
      ],
    });
  };

  const setCollectBorrowRequest = (borrowId) => {
    showDialog({
      title: "Are you sure?",
      subtitle: "Do you wand to collect this tool",
      buttons: [
        { title: "Cancel", color: "inherit" },
        {
          title: "Collect",
          color: "info",
          onClick: () => onCollectBorrow(borrowId),
        },
      ],
    });
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
            <StyledTableCell>Requested student</StyledTableCell>
            {isRequested && (
              <>
                <StyledTableCell>Requested date</StyledTableCell>
              </>
            )}
            {isApproved && (
              <>
                <StyledTableCell>Approved by</StyledTableCell>
                <StyledTableCell>Approved date</StyledTableCell>
              </>
            )}
            {isRejected && (
              <>
                <StyledTableCell>Rejected by</StyledTableCell>
                <StyledTableCell>Rejected date</StyledTableCell>
              </>
            )}
            {isReturned && (
              <>
                <StyledTableCell>Collected by</StyledTableCell>
                <StyledTableCell>Collected date</StyledTableCell>
              </>
            )}
            <StyledTableCell align="center">Due date</StyledTableCell>
            {(isRequested || isApproved) && (
              <StyledTableCell style={{ width: 220 }} align="center">
                Actions
              </StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {borrows.length > 0 ? (
            borrows.map((row) => {
              return (
                <StyledTableRow key={row.tool?.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.tool?.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.tool?.description}</StyledTableCell>
                  <StyledTableCell>{row.student?.name}</StyledTableCell>
                  {isRequested && (
                    <>
                      <StyledTableCell>
                        {getDateValue(row.requestedDate)}
                      </StyledTableCell>
                    </>
                  )}
                  {isApproved && (
                    <>
                      <StyledTableCell>{row.approvedBy?.name}</StyledTableCell>
                      <StyledTableCell>
                        {getDateValue(row.approvedDate)}
                      </StyledTableCell>
                    </>
                  )}
                  {isRejected && (
                    <>
                      <StyledTableCell>{row.rejectedBy?.name}</StyledTableCell>
                      <StyledTableCell>
                        {getDateValue(row.rejectedDate)}
                      </StyledTableCell>
                    </>
                  )}
                  {isReturned && (
                    <>
                      <StyledTableCell>{row.collectedBy?.name}</StyledTableCell>
                      <StyledTableCell>
                        {getDateValue(row.collectedDate)}
                      </StyledTableCell>
                    </>
                  )}
                  <StyledTableCell align="center">
                    {getDateValue(row.dueDate)}
                  </StyledTableCell>
                  {(isRequested || isApproved) && (
                    <StyledTableCell align="center">
                      {isRequested && (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                              setApproveRequest({
                                borrowingId: row._id,
                                dueDate: row.dueDate,
                              })
                            }
                            style={{ marginRight: 3 }}
                          >
                            Approve
                          </Button>

                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => rejectBorrowRequest(row._id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {isApproved && (
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => setCollectBorrowRequest(row._id)}
                        >
                          Collect
                        </Button>
                      )}
                    </StyledTableCell>
                  )}
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
                  No borrowings available
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ApproveRequestModal
        open={!!approveRequest}
        setOpen={setApproveRequest}
        refetch={refetch}
        data={approveRequest || null}
      />
    </TableContainer>
  );
}
