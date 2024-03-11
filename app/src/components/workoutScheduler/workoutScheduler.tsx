import * as React from "react";
import DialogContentText from "@mui/material/DialogContentText";
import { WorkoutsDialog } from "../workoutsDialog";
import { WorkoutsContext } from "../../providers/workouts";
import { RRuleGenerator } from "../rRuleGenerator";

import "./workoutScheduler.module.scss";
import { LoadingContext } from "../../providers/loading";
import {
  WorkoutScreen,
  WorkoutsManagementContext,
} from "../../providers/workoutsManagement";

export const WorkoutScheduler = (): JSX.Element => {
  const { actions, state } = React.useContext(WorkoutsContext);
  const loadingCtx = React.useContext(LoadingContext);
  const screenCtx = React.useContext(WorkoutsManagementContext);

  if (screenCtx.state.activeScreen !== WorkoutScreen.Schedule) {
    return <></>;
  }

  const allDates = state.rrule.all();
  const onCancelClick = (event: React.MouseEvent<HTMLElement>): boolean => {
    actions.setSelected();
    screenCtx.actions.setActive(WorkoutScreen.List);
    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  const onSaveClick = async (
    event: React.MouseEvent<HTMLElement>
  ): Promise<boolean> => {
    if (allDates.length <= 0) {
      return false;
    }

    event.stopPropagation();
    event.preventDefault();
    loadingCtx.actions.show("Scheduling workouts");
    await actions.scheduleWorkouts();
    actions.setSelected();
    screenCtx.actions.setActive(WorkoutScreen.List);
    loadingCtx.actions.hide();
    const firstDate = allDates[0];
    window.location.href = `https://connect.garmin.com/modern/calendar/${firstDate.getFullYear()}/${firstDate.getMonth()}`;
    return false;
  };

  return (
    <WorkoutsDialog
      title={`Schedule ${state.selected?.workoutName}`}
      onCancelClick={onCancelClick}
      onSaveClick={onSaveClick}
      disableSaveButton={allDates.length <= 0}
    >
      <DialogContentText>{state.selected?.description}</DialogContentText>
      <RRuleGenerator />
    </WorkoutsDialog>
  );
};
