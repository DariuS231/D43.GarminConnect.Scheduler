import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { IDeleteItemsDialogProps } from ".";

export const DeleteItemsDialog = (
  props: IDeleteItemsDialogProps
): JSX.Element => {
  const {
    handleClose,
    singleEntityName,
    multipleEntityName,
    selectedItemsText,
    handleOk,
  } = props;
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        This action is irreversible
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the selected{" "}
          {selectedItemsText.length === 1
            ? singleEntityName
            : multipleEntityName}
          ?
          <ul>
            {selectedItemsText.map((name: string) => {
              return <li>{name}</li>;
            })}
          </ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleOk} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
