import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import { ScheduledDeleteProviderContext } from "./scheduledDeleteProvider/scheduledDeleteProvider.context";
import DeleteIcon from "@mui/icons-material/Delete";
import { getMonthName } from "./utils";
import { ScheduledDeleteDialog } from "./scheduledDeleteDialog";
import { LoadingContext } from "../../providers/loading";
import { ICalendarMonth, ScheduleContext } from "../../providers/schedule";

export interface IScheduledDeleteTableHeaderProps {}

export const ScheduledDeleteTableHeader = (
  props: IScheduledDeleteTableHeaderProps
): JSX.Element => {
  const { state, actions } = React.useContext(ScheduledDeleteProviderContext);
  const scheduleCtx = React.useContext(ScheduleContext);
  const loadingCtx = React.useContext(LoadingContext);
  const { items, selectedYear, selectedMonth, selectedIds } = state;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setOpen(false);
    loadingCtx.actions.show("Removing the selected scheduled workouts...");
    const requests = selectedIds.map((sid: number) => scheduleCtx.actions.remove(sid));
    const resp = await Promise.all(requests);

    const cal = await scheduleCtx.actions.getAll(selectedYear, selectedMonth);
    actions.setItems(cal.calendarItems);
    loadingCtx.actions.hide();
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedIds.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedIds.length > 0 ? (
        <>
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selectedIds.length} selected
          </Typography>
          <>
            <Tooltip title="Delete">
              <IconButton onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {open && (
              <ScheduledDeleteDialog
                handleClose={handleClose}
                handleOk={handleOk}
              />
            )}
          </>
        </>
      ) : (
        <>
          <Typography
            sx={{ flex: "80%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Scheduled workouts
          </Typography>
          <Typography variant="subtitle1" component="div">
            {items.length} scheduled for {getMonthName(selectedMonth)}{" "}
            {selectedYear}
          </Typography>
        </>
      )}
    </Toolbar>
  );
};
