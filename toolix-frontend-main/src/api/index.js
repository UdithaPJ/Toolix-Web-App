import axios from "axios";
import { API_BASE } from "../constants/environment";
import store from "../store/store";
import { showDialog } from "../components/dialog";
import { getToken, logoutUser } from "../store/local_storage";
import routes from "../constants/routes";

export const HTTP = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

const client = axios.create({
  baseURL: API_BASE,
});

const onSuccess = (response) => {
  return response.data;
};

const performRequest = async ({
  method,
  url,
  params,
  data,
  appendToken = true,
}) => {
  try {
    store.getActions().setLoading(true);
    const headers = {};
    if (appendToken) {
      headers.Authorization = getToken();
    }
    const response = await client({
      url,
      method,
      params,
      data,
      headers,
    });
    store.getActions().setLoading(false);
    return onSuccess(response);
  } catch (error) {
    store.getActions().setLoading(false);
    if (error.response.status === 401) {
      window.location.href=routes.LOGIN_SIGNUP
      logoutUser()
    }
    if (error?.response?.data?.message) {
      showDialog({
        title: "Info",
        subtitle: error.response.data.message,
        buttons: [{}],
      });
    } else {
      showDialog({
        title: "Info",
        subtitle: "Something went wrong! Please contact admin support",
        buttons: [{}],
      });
    }
    throw Error(error?.response?.data?.message || error.message);
  }
};

export default performRequest;
