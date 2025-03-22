import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/custom_input";
import CustomButton from "../../../components/custom_button";
import { Handyman, Info } from "@mui/icons-material";
import { updateToolApi } from "../../../api/admin_api";
import { showDialog } from "../../../components/dialog";
import updateToolSchema from "../schemas/update_tool_schema";

export default function UpdateToolModal({ open, setOpen, tool, refetch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(updateToolSchema),
  });

  const onSubmit = async (data) => {
    try {
      await updateToolApi(tool._id, data);
      showDialog({
        title: "Info",
        subtitle: "You have successfully updated the tool!",
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
    reset(tool);
    trigger();
  }, [open, reset, tool, trigger]);

  return (
    <Modal open={open}>
      <div className="modal_container">
        <form className="input_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="text_header">Update tool</div>
          <div className="text_sub_header">
            {`Please update tool details. Once updated, students will be able to see the updated tools`}
          </div>
          <CustomInput
            icon={Handyman}
            title={"Tool name"}
            type={"text"}
            register={register}
            name="name"
            errors={errors}
          />
          <CustomInput
            icon={Info}
            title={"Tool description"}
            type={"text"}
            register={register}
            name="description"
            errors={errors}
          />
          <Box height={20} />
          <div className="submit_container">
            <CustomButton variant="gray" title="Cancel" onClick={handleClose} />
            <CustomButton variant="green" type="submit" title="Update" />
          </div>
        </form>
      </div>
    </Modal>
  );
}
