import * as yup from "yup";

const forgetPasswordVerifySchema = yup.object().shape({
  userName: yup.string().required("User name is required"),
  email: yup.string().email().required("Email address is required"),
});

export default forgetPasswordVerifySchema