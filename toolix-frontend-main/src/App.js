import React from "react";
import AppRoutes from "./routes";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";
import Loader from "./components/loader";
import CustomDialog from "./components/dialog";

function App() {
  return (
    <StoreProvider store={store}>
      <AppRoutes />
      <Loader/>
      <CustomDialog/>
    </StoreProvider>
  );
}

export default App;
