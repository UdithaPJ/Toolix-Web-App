import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import CustomButton from "../../components/custom_button";
import CustomInput from "../../components/custom_input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./schema/login_schema";
import signUpSchema from "./schema/signup_schema";
import routes from "../../constants/routes";
import { Box } from "@mui/material";
import { loginApi, signUpApi } from "../../api/auth_api";
import { AccountCircle, Email, Lock, Person } from "@mui/icons-material";
import { showDialog } from "../../components/dialog";
import { useStoreActions } from "easy-peasy";
import { setToken } from "../../store/local_storage";
import { USER_ROLES } from "../../constants/enums";
import { useNavigate } from "react-router-dom";

export default function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <Header auth />
      <div className="container">
        <div className="submit_container">
          <CustomButton
            title={"Sign Up"}
            onClick={() => setIsLogin(false)}
            variant={isLogin ? "default" : "gray"}
          />
          <CustomButton
            title={"Login"}
            onClick={() => setIsLogin(true)}
            variant={isLogin ? "gray" : "default"}
          />
        </div>

        {isLogin ? <LoginForm /> : <SignUpForm setIsLogin={setIsLogin} />}
      </div>
    </div>
  );
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const setUser = useStoreActions((actions) => actions.setUser);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const loginResponse = await loginApi(data);
      const { user, accessToken } = loginResponse.data;
      setUser(user);
      setToken(accessToken);
      if (user.role === USER_ROLES.ADMIN) {
        navigate(routes.ADMIN.TOOLS)
      } else if (user.role === USER_ROLES.INSTRUCTOR) {
        navigate(routes.INSTRUCTOR.REQUESTS)
      } else {
        navigate(routes.STUDENT.REQUEST_TOOLS)
      }
    } catch (error) {}
  };

  return (
    <form className="input_form" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        icon={AccountCircle}
        title={"User Name"}
        type={"text"}
        register={register}
        name="userName"
        errors={errors}
      />
      <CustomInput
        icon={Lock}
        title={"Password"}
        type={"password"}
        register={register}
        name="password"
        errors={errors}
      />
      <Link to={routes.FORGET_PASSWORD}>Forgot Password? Click here</Link>
      <CustomButton title={"Login"} variant={"green"} type="submit" />
    </form>
  );
};

const SignUpForm = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signUpApi(data);
      showDialog({
        title: "Registration Success",
        subtitle:
          "You have successfully registered to Toolix. Please login to system using your User name and Password",
        buttons: [{}],
      });
      setIsLogin(true);
    } catch (error) {}
  };
  return (
    <form className="input_form" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        icon={Person}
        title={"Full Name"}
        type={"text"}
        register={register}
        name="name"
        errors={errors}
      />
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
      <CustomInput
        icon={Lock}
        title={"Password"}
        type={"password"}
        register={register}
        name="password"
        errors={errors}
      />
      <CustomInput
        icon={Lock}
        title={"Confirm Password"}
        type={"password"}
        register={register}
        name="confirmPassword"
        errors={errors}
      />
      <Box height={20} />
      <CustomButton title={"Sign Up"} variant={"green"} type="submit" />
    </form>
  );
};
