import * as yup from "yup";

const loginSchema = yup.object().shape({
  userName: yup.string().required("User name is required"),
  password: yup.string().required("Password is required"),
});

export default loginSchema