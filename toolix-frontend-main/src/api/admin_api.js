import performRequest, { HTTP } from ".";
import { GET_TOOLS_TYPES } from "../constants/enums";

export const getAdminToolsApi = async ({ search = "" }) =>
  performRequest({
    method: HTTP.GET,
    url: "/api/tools",
    params: {
      search,
      type: GET_TOOLS_TYPES.ALL,
    },
    appendToken: true,
  });

export const createToolApi = async ({ name, description, quantity }) =>
  performRequest({
    method: HTTP.POST,
    url: "/api/tools",
    data: {
      name,
      description,
      quantity,
    },
    appendToken: true,
  });

export const updateToolApi = async (id, { name, description }) =>
  performRequest({
    method: HTTP.PUT,
    url: `/api/tools/${id}`,
    data: {
      name,
      description,
    },
    appendToken: true,
  });

export const deleteToolApi = async (id) =>
  performRequest({
    method: HTTP.DELETE,
    url: `/api/tools/${id}`,
    appendToken: true,
  });

export const getBorrowHistory = async (query) =>
  performRequest({
    method: HTTP.GET,
    url: `/api/borrowings`,
    appendToken: true,
    params: query,
  });

export const updateBorrowApi = async (id, { status, dueDate }) =>
  performRequest({
    method: HTTP.PUT,
    url: `/api/borrowings/${id}`,
    data: {
      status,
      dueDate,
    },
    appendToken: true,
  });

export const getBorrowHistoryByInstructorId = async (query) =>
  performRequest({
    method: HTTP.GET,
    url: `/api/borrowings/by-instructor`,
    appendToken: true,
    params: query,
  });

export const getUsersApi = async (query) =>
  performRequest({
    method: HTTP.GET,
    url: `/api/users`,
    appendToken: true,
    params: query,
  });
