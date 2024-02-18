import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import { ScheduledDeleteProviderContext } from "./scheduledDeleteProvider/scheduledDeleteProvider.context";
import DeleteIcon from "@mui/icons-material/Delete";
import { getMonthName } from "./utils";
import { ScheduledDeleteDialog } from "./scheduledDeleteDialog";
import { LoadingContext } from "../../providers/loading";
import { ICalendarItem, ScheduleContext } from "../../providers/schedule";
import { SelectedToolbar } from "../selectedToolbar";

export interface IScheduledDeleteTableHeaderProps {}

export const ScheduledDeleteTableHeader = (
  props: IScheduledDeleteTableHeaderProps
): JSX.Element => {
  const { state, actions } = React.useContext(ScheduledDeleteProviderContext);
  const scheduleCtx = React.useContext(ScheduleContext);
  const loadingCtx = React.useContext(LoadingContext);
  const { items, selectedYear, selectedMonth, selectedIds } = state;

  const monthName = getMonthName(selectedMonth);

  const handleOk = async () => {
    loadingCtx.actions.show("Removing the selected scheduled workouts...");
    const requests = selectedIds.map((sid: number) =>
      scheduleCtx.actions.remove(sid)
    );
    const resp = await Promise.all(requests);

    const cal = await scheduleCtx.actions.getAll(selectedYear, selectedMonth);
    actions.setItems(cal.calendarItems);
    loadingCtx.actions.hide();
  };


  const getDeleteConfirmTexts = (): string[] => {
    let names: string[] = [];

    selectedIds.forEach((id) => {
      const workout = items.find((i: ICalendarItem) => i.id === id);
      if (workout)
        names.push(
          `${workout?.localDate.toLocaleDateString()} - ${workout?.title}`
        );
    });
    return names;
  };
  return (
    <SelectedToolbar
      getDeleteConfirmTexts={getDeleteConfirmTexts}
      handleDeleteConfirm={handleOk}
      multipleEntityName="Scheduled workouts"
      singleEntityName="Scheduled workout"
      noSelectedEntityText={`${items.length} scheduled for ${monthName} ${selectedYear}`} selectedCount={selectedIds.length}
    />
  );
};
