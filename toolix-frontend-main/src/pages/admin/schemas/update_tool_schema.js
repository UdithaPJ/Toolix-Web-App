import * as yup from "yup";

const updateToolSchema = yup.object().shape({
  name: yup.string().required("Tool name is required"),
  description: yup.string().optional().nullable(),
});

export default updateToolSchema;
