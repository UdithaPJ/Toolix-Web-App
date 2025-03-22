import { Backdrop, CircularProgress } from "@mui/material";
import { useStoreState } from "easy-peasy";
import React from "react";

export default function Loader() {
  const open = useStoreState((state) => state.isLoading);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
