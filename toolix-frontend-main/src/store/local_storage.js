const TOOLIX_USER = "TOOLIX_USER";
const TOOLIX_TOKEN = "TOOLIX_TOKEN";

export const getLocalUser = () =>
  JSON.parse(localStorage.getItem(TOOLIX_USER) || "{}");

export const setLocalUser = (user) =>
  localStorage.setItem(TOOLIX_USER, JSON.stringify(user || {}));

export const getToken = () => `Bearer ${localStorage.getItem(TOOLIX_TOKEN)}`;

export const setToken = (token) => localStorage.setItem(TOOLIX_TOKEN, token);

export const logoutUser = () => {
  setToken(null);
  setLocalUser(null);
};
