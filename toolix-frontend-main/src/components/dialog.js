import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useStoreActions, useStoreState } from "easy-peasy";
import store from "../store/store";

export default function CustomDialog() {
  const { open, title, subtitle, buttons } = useStoreState(
    (state) => state.dialog
  );
  const setDialog = useStoreActions((actions) => actions.setDialog);

  const handleClose = () => {
    setDialog({
      open: false,
      title: "",
      subtitle: "",
      buttons: [],
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {subtitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttons.map(({ variant, color, title, onClick }, index) => (
          <Button
            key={index}
            variant={variant}
            color={color}
            onClick={() => {
              if (onClick) onClick();
              handleClose();
            }}
          >
            {title}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}

export const showDialog = ({ title, subtitle = "", buttons }) => {
  store.getActions().setDialog({
    open: true,
    title,
    subtitle,
    buttons: buttons.map((b) => ({
      title: b.title || "Ok",
      variant: b.variant || "contained",
      color: b.color || "primary",
      onClick: b.onClick || null,
    })),
  });
};
