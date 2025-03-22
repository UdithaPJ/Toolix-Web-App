import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/common/landing_page";
import LoginSignupPage from "./pages/auth/login_signup";
import routes from "./constants/routes";
import ForgetPassword from "./pages/auth/forget_password";
import AdminToolsPage from "./pages/admin/tool_management/admin_tools_page";
import AdminToolHistoryPage from "./pages/admin/tool_history/tool_history_page";
import AdminInstructorHistoryPage from "./pages/admin/instructor_history/instructor_history_page";
import StudentRequestToolsPage from "./pages/student/request-tools/student_request_tools_page";
import MyToolsPage from "./pages/student/my_tools/my_tools_page";
import AdminBorrowingPage from "./pages/admin/borrow_management/admin_borrow_page";
import InstructorBorrowingPage from "./pages/instructor/borrow_management/instructor_borrow_page";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.LANDING} element={<LandingPage />} />
      <Route path={routes.LOGIN_SIGNUP} element={<LoginSignupPage />} />
      <Route path={routes.FORGET_PASSWORD} element={<ForgetPassword />} />
      <Route path={routes.ADMIN.BASE}>
        <Route path={routes.ADMIN.TOOLS} element={<AdminToolsPage />} />
        <Route
          path={routes.ADMIN.TOOL_HISTORY()}
          element={<AdminToolHistoryPage />}
        />
        <Route
          path={routes.ADMIN.INSTRUCTOR_HISTORY}
          element={<AdminInstructorHistoryPage />}
        />
        <Route path={routes.ADMIN.BORROWING} element={<AdminBorrowingPage />} />
      </Route>
      <Route path={routes.INSTRUCTOR.BASE}>
        <Route
          path={routes.INSTRUCTOR.REQUESTS}
          element={<InstructorBorrowingPage />}
        />
      </Route>
      <Route path={routes.STUDENT.BASE}>
        <Route
          path={routes.STUDENT.REQUEST_TOOLS}
          element={<StudentRequestToolsPage />}
        />
        <Route path={routes.STUDENT.MY_TOOLS} element={<MyToolsPage />} />
      </Route>
    </Routes>
  );
}
