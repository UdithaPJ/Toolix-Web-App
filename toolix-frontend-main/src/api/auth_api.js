import performRequest, { HTTP } from ".";

export const loginApi = async ({ userName, password }) =>
  performRequest({
    method: HTTP.POST,
    url: "/auth/login",
    data: { userName, password },
  });

export const signUpApi = async ({ userName, email, password, name }) =>
  performRequest({
    method: HTTP.POST,
    url: "/auth/signUp",
    data: { userName, email, password, name },
  });

export const forgetPasswordCheckApi = async ({ userName, email }) =>
  performRequest({
    method: HTTP.POST,
    url: "/auth/forget-password-check",
    data: { userName, email },
  });

export const forgetPasswordSet = async ({ userId, password }) =>
  performRequest({
    method: HTTP.POST,
    url: "/auth/forget-password-set-password",
    data: { userId, password },
  });
