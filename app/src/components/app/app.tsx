import * as React from "react";
import { WorkoutsList } from "../workoutsList";
import { WorkoutScheduler } from "../workoutScheduler";
import { AppContext, Apps } from ".";
import { ScheduledDeleteApp } from "../scheduledDelete/scheduledDeleteApp";
import { ScheduleProvider } from "../../providers/schedule";
import { WorkoutsProvider } from "../../providers/workouts";

import "./app.module.scss";

export const App = (): JSX.Element => {
  const { state } = React.useContext(AppContext);

  const { isOpen, app } = state;
  if (!isOpen || app === Apps.None) {
    return <></>;
  }

  switch (state.app) {
    case Apps.Workouts:
      return (
        <WorkoutsProvider>
          <WorkoutsList />
          <WorkoutScheduler />
        </WorkoutsProvider>
      );

    case Apps.DeleteScheduled:
      return (
        <ScheduleProvider>
          <ScheduledDeleteApp />
        </ScheduleProvider>
      );

    case Apps.None:
    default:
      return <></>;
  }
};
