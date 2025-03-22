import performRequest, { HTTP } from ".";
import { GET_TOOLS_TYPES } from "../constants/enums";

export const getStudentToolsApi = async ({ search = "" }) =>
  performRequest({
    method: HTTP.GET,
    url: "/api/tools",
    params: {
      search,
      type: GET_TOOLS_TYPES.CURRENT,
    },
    appendToken: true,
  });

export const studentRequestToolsApi = async ({ toolId, dueDate }) =>
  performRequest({
    method: HTTP.POST,
    url: "/api/borrowings",
    data: {
      toolId,
      dueDate,
    },
    appendToken: true,
  });

export const getStudentBorrowHistory = async ({ student, status }) =>
  performRequest({
    method: HTTP.GET,
    url: "/api/borrowings",
    params: {
      student,
      status,
    },
    appendToken: true,
  });
