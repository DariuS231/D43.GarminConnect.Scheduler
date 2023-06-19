import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import { ICalendarItem } from "../../providers/schedule";
import { ScheduledDeleteProviderContext } from "./scheduledDeleteProvider/scheduledDeleteProvider.context";

export interface IScheduledDeleteDialogProps {
  handleClose: () => void;
}

export const ScheduledDeleteDialog = (
  props: IScheduledDeleteDialogProps
): JSX.Element => {
  const { state, actions } = React.useContext(ScheduledDeleteProviderContext);
  const { selectedIds, items } = state;

  const { handleClose } = props;
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
          Are you sure you want to delete the selected workouts?
          <ul>
            {selectedIds.map((sid: number) => {
              const workout = items.find((i: ICalendarItem) => i.id === sid);
              if (workout)
                return (
                  <li>
                    {new Date(workout?.date).toLocaleDateString()} -{" "}
                    {workout?.title}
                  </li>
                );
            })}
          </ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
