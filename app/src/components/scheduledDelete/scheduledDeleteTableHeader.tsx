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
import { ICalendarItem } from "../../providers/schedule";
import { ScheduledDeleteDialog } from "./scheduledDeleteDialog";

export interface IScheduledDeleteTableHeaderProps {}

export const ScheduledDeleteTableHeader = (
  props: IScheduledDeleteTableHeaderProps
): JSX.Element => {
  const { state } = React.useContext(ScheduledDeleteProviderContext);
  const { items, selectedYear, selectedMonth, selectedIds } = state;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
            {open && <ScheduledDeleteDialog handleClose={handleClose} />}
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
