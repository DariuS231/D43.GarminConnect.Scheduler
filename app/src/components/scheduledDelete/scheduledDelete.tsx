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

  const { selectedYear, selectedMonth } = scheduledDeleteCtx.state;

  React.useEffect(() => {
    loadingCtx.actions.show();
    scheduleCtx.actions.getAll(selectedYear, selectedMonth).then((cal) => {
      scheduledDeleteCtx.actions.setItems(cal.calendarItems);
      loadingCtx.actions.hide();
    });
  }, [selectedYear, selectedMonth]);

  return (
    <WorkoutsDialog title="Scheduled workouts" maxWidth="lg">
      <ScheduledDeleteFilter />
      <ScheduledDeleteTable />
    </WorkoutsDialog>
  );
};
