import React, { useState } from "react";
import Header from "../../components/header";
import CustomInput from "../../components/custom_input";
import forgetPasswordVerifySchema from "./schema/forget_password_verify_schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../../components/custom_button";
import { Box } from "@mui/material";
import forgetPasswordSetSchema from "./schema/forget_password_set_schema";
import { AccountCircle, Email, Lock } from "@mui/icons-material";
import { forgetPasswordCheckApi, forgetPasswordSet } from "../../api/auth_api";
import { showDialog } from "../../components/dialog";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes";

export default function ForgetPassword() {
  const [userId, setUserId] = useState(null);
  return (
    <div>
      <Header auth />
      <div className="container">
        <div className="text_header">Recover Password</div>
        <div className="text_sub_header">
          {userId
            ? `Your email address and user name is verified successfully. Please create a new password for you account!`
            : `You must verify your valid email address and user name before
          resetting the password`}
        </div>
        {userId ? (
          <SetPassword userId={userId} />
        ) : (
          <VerifyEmail setUserId={setUserId} />
        )}
      </div>
    </div>
  );
}

const VerifyEmail = ({ setUserId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetPasswordVerifySchema),
  });

  const onSubmit = async (data) => {
    try {
      const { email, userName } = data;
      const response = await forgetPasswordCheckApi({ email, userName });
      setUserId(response.data.userId);
    } catch (error) {}
  };
  return (
    <form className="input_form" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        icon={Email}
        title={"Email Address"}
        type={"text"}
        register={register}
        name="email"
        errors={errors}
      />
      <CustomInput
        icon={AccountCircle}
        title={"User Name"}
        type={"text"}
        register={register}
        name="userName"
        errors={errors}
      />
      <Box height={20} />
      <CustomButton title={"Verify"} variant={"green"} type="submit" />
    </form>
  );
};

const SetPassword = ({ userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetPasswordSetSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { password } = data;
      await forgetPasswordSet({ password, userId });
      showDialog({
        title: "Success!",
        subtitle:
          "You have successfully changed your password. Please log in to system using your User name and new password",
        buttons: [{}],
      });
      navigate(routes.LOGIN_SIGNUP);
    } catch (error) {}
  };

  return (
    <form className="input_form" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        icon={Lock}
        title={"New password"}
        type={"password"}
        register={register}
        name="password"
        errors={errors}
      />
      <CustomInput
        icon={Lock}
        title={"Re-type password"}
        type={"password"}
        register={register}
        name="confirmPassword"
        errors={errors}
      />
      <Box height={20} />
      <CustomButton title={"Submit"} variant={"green"} type="submit" />
    </form>
  );
};
