import { AppBar, Avatar, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { home_image } from "../constants/image_paths";
import routes from "../constants/routes";
import { useStoreState } from "easy-peasy";
import { Logout } from "@mui/icons-material";
import { logoutUser } from "../store/local_storage";

export default function Header({ auth, dashboard, loggedIn, buttons }) {
  const user = useStoreState((state) => state.user);
  const navigate = useNavigate();

  const onLogout = () => {
    logoutUser()
    navigate(routes.LOGIN_SIGNUP);
  };
  return (
    <>
      <AppBar
        component="nav"
        style={{ backgroundColor: "black", position: "fixed" }}
      >
        <Toolbar style={{ maxHeight: 50, height: 50, minHeight: 50 }}>
          {loggedIn && user?.name && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar>
                  {user.name
                    .split(" ")
                    .slice(0, 2)
                    .map((a) => a[0].toUpperCase())
                    .join("")}
                </Avatar>
                <span
                  style={{ marginLeft: 10, fontWeight: "bold", fontSize: 20 }}
                >
                  {user.name}
                </span>
              </div>
              <div>
                {buttons}
                <IconButton
                  style={{ color: "white", marginLeft: 10 }}
                  onClick={onLogout}
                >
                  <span style={{ fontSize: 16, marginRight: 10 }}>Logout</span>
                  <Logout />
                </IconButton>
              </div>
            </div>
          )}

          {!loggedIn && auth && (
            <Link to="/">
              <img className="home_image" src={home_image} alt="home icon" />
            </Link>
          )}

          {!loggedIn && dashboard && (
            <>
              <div style={{ width: "100%" }} />
              <Link to={routes.LOGIN_SIGNUP} className="login-link">
                Login/SignUp
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ height: 50 }} />
    </>
  );
}
