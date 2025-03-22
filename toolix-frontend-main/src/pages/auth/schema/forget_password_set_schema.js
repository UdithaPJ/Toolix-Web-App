import * as yup from "yup";

const forgetPasswordSetSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Confirm passwords must match"),
});

export default forgetPasswordSetSchema;
