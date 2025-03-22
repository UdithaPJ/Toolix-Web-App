import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/custom_button";
import { showDialog } from "../../../components/dialog";
import { studentRequestToolsApi } from "../../../api/student_api";
import CustomDatePicker from "../../../components/custom_date_picker";

export default function RequestToolModal({ open, setOpen, refetch, toolId }) {
  const [dueDate, setDueDate] = useState();

  const handleSubmit = async () => {
    try {
      if (!dueDate) {
        showDialog({
          title: "Info",
          subtitle: "Please select a due date before submit",
          buttons: [{}],
        });
        return;
      }
      await studentRequestToolsApi({ toolId, dueDate });
      showDialog({
        title: "Info",
        subtitle:
          "Tool request was sent successfully. You can check your requests on 'My Tools'.",
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
    setDueDate(null);
  }, [open]);

  return (
    <Modal open={open}>
      <div className="modal_container">
        <div className="input_form">
          <div className="text_header">Requesting a tool</div>
          <div className="text_sub_header">
            {`If you're wish to request this tool, please pick a due date submit. The submitted request will be sent to instructors for approvals`}
          </div>
          <CustomDatePicker label="Select the due date" value={dueDate} onChange={setDueDate} disablePast/>
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
