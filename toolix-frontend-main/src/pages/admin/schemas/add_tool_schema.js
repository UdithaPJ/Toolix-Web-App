import * as yup from "yup";

const addToolSchema = yup.object().shape({
  name: yup.string().required("Tool name is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .integer()
    .positive()
    .min(1, "Quantity should be grate than or equal to 1"),
  description: yup.string().optional().nullable(),
});

export default addToolSchema;
