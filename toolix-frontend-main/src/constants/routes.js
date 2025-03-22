const routes = {
  LANDING: "/",
  LOGIN_SIGNUP: "/login-signup",
  FORGET_PASSWORD: "/forget-password",
  ADMIN: {
    BASE: "/admin",
    TOOLS: "/admin/tools",
    TOOL_HISTORY: (toolId = ":toolId") => `/admin/tools/${toolId}/history`,
    INSTRUCTOR_HISTORY: "/admin/instructor-history",
    BORROWING: "/admin/borrowings",
  },
  INSTRUCTOR: {
    BASE: "/instructor",
    REQUESTS: "/instructor/requests",
  },
  STUDENT: {
    BASE: "/student",
    REQUEST_TOOLS: "/student/request-tools",
    MY_TOOLS: "/student/my-tools",
  },
};

export default routes;
