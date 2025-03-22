import { action, createStore } from "easy-peasy";
import { getLocalUser, setLocalUser } from "./local_storage";

const store = createStore({
  user: getLocalUser(),
  setUser: action((state, payload) => {
    setLocalUser(payload);
    state.user = payload;
  }),

  isLoading: false,
  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  dialog: {
    open: false,
    title: "",
    subtitle: "",
    buttons: [
      {
        title: "Ok",
        variant: "contained", // "contained" | "outlined" | "text"
        color: "primary", //  "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
        onClick: () => {},
      },
    ],
  },
  setDialog: action((state, payload) => {
    state.dialog = payload;
  }),
});

export default store;
