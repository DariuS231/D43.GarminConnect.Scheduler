import * as React from "react";
import { IScheduledDeleteProps } from ".";
import { WorkoutsDialog } from "../workoutsDialog";
import { LoadingContext } from "../../providers/loading";
import { ScheduleContext, ICalendarItem } from "../../providers/schedule";
import { ScheduledDeleteFilter } from "./scheduledDeleteFilter";
import { ScheduledDeleteProviderContext } from "./scheduledDeleteProvider/scheduledDeleteProvider.context";
import { ScheduledDeleteTable } from "./scheduledDeleteTable";

export const ScheduledDelete = (props: IScheduledDeleteProps): JSX.Element => {
  const loadingCtx = React.useContext(LoadingContext);
  const scheduleCtx = React.useContext(ScheduleContext);
  const scheduledDeleteCtx = React.useContext(ScheduledDeleteProviderContext);

  React.useEffect(() => {
    loadingCtx.actions.show();
    scheduleCtx.actions
      .getAll(
        scheduledDeleteCtx.state.selectedYear,
        scheduledDeleteCtx.state.selectedMonth
      )
      .then((cal) => {
        scheduledDeleteCtx.actions.setItems(
          cal.calendarItems.filter((ci) => ci.itemType === "workout")
        );
        loadingCtx.actions.hide();
      });
  }, [
    scheduledDeleteCtx.state.selectedYear,
    scheduledDeleteCtx.state.selectedMonth,
  ]);

  return (
    <WorkoutsDialog title="Scheduled workouts" maxWidth="lg">
      <ScheduledDeleteFilter />
      <ScheduledDeleteTable />
    </WorkoutsDialog>
  );
};
