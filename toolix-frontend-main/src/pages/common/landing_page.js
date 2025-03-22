import React from "react";
import Header from "../../components/header";

export default function LandingPage() {
  return (
    <div>
      <Header dashboard />
      <div>
        <div>
          <h1 className="top1">
            <font color="black">T</font>
            <font color="black">o</font>
            <font color="black">o</font>
            <font color="black">l</font>
            <font color="#FFD523">i</font>
            <font color="#FFD523">x</font>
            <p className="topP">
              A web app to control manufacturing tools of the university.
            </p>
          </h1>
        </div>
        <div className="container_2">
          <div className="box">User Authentication and Authentication</div>
          <div className="box">Tool Inventory Management</div>
          <div className="box">Tool Tracking</div>
          <div className="box">Notification and Alerts</div>
        </div>
      </div>
    </div>
  );
}
