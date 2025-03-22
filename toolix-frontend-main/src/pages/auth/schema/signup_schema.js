import * as yup from "yup";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email address is required"),
  userName: yup.string().required("User name is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Confirm passwords must match"),
});

export default signUpSchema;
