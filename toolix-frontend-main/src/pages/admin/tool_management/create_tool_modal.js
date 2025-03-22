import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import addToolSchema from "../schemas/add_tool_schema";
import CustomInput from "../../../components/custom_input";
import CustomButton from "../../../components/custom_button";
import { Handyman, Info, ScatterPlot } from "@mui/icons-material";
import { createToolApi } from "../../../api/admin_api";
import { showDialog } from "../../../components/dialog";

export default function CreateToolModal({ open, setOpen, refetch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addToolSchema),
  });

  const onSubmit = async (data) => {
    try {
      await createToolApi(data);
      showDialog({
        title: "Info",
        subtitle: "New tool created successfully!",
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
    reset();
  }, [open, reset]);

  return (
    <Modal open={open}>
      <div className="modal_container">
        <form className="input_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="text_header">Add new tool</div>
          <div className="text_sub_header">
            {`Please enter details of the tool that you wish to add to the inventory. Once added, students will be able to see newly added tools`}
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
            icon={ScatterPlot}
            title={"Quantity"}
            type={"number"}
            register={register}
            name="quantity"
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
            <CustomButton variant="green" type="submit" title="Create" />
          </div>
        </form>
      </div>
    </Modal>
  );
}
