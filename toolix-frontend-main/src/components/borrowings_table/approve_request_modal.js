import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDatePicker from "../custom_date_picker";
import CustomButton from "../custom_button";
import { showDialog } from "../dialog";
import dayjs from "dayjs";
import { updateBorrowApi } from "../../api/admin_api";
import { BORROW_STATUSES } from "../../constants/enums";

export default function ApproveRequestModal({ open, setOpen, refetch, data }) {
  const dueDate = data?.dueDate;
  const [updatedDueDate, setUpdatedDueDate] = useState();

  const handleSubmit = async () => {
    try {
      if (!updatedDueDate) {
        showDialog({
          title: "Info",
          subtitle: "Please select a due date before approve",
          buttons: [{}],
        });
        return;
      }
      await updateBorrowApi(data.borrowingId, {
        status: BORROW_STATUSES.APPROVED,
        dueDate: updatedDueDate,
      });
      showDialog({
        title: "Info",
        subtitle:
          "Tool request was approved successfully. You can find approved borrows on the list",
        buttons: [{}],
      });
      handleClose();
      refetch();
    } catch (error) {}
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open && dueDate) {
      setUpdatedDueDate(dayjs(new Date(dueDate.split("T")[0] || "")));
    }
  }, [open, dueDate]);

  return (
    <Modal open={open}>
      <div className="modal_container">
        <div className="input_form">
          <div className="text_header">Approve tool request</div>
          <div className="text_sub_header">
            {`You are about to approve this tool request. You can update the due date if you want and it will reflect on student's dashboard`}
          </div>
          <CustomDatePicker
            label="Due date"
            value={updatedDueDate}
            onChange={setUpdatedDueDate}
            disablePast
          />
          <Box height={20} />
          <div className="submit_container">
            <CustomButton variant="gray" title="Cancel" onClick={handleClose} />
            <CustomButton
              variant="green"
              title="Submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
