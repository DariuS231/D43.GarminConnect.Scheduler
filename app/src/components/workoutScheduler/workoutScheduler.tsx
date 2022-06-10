import * as React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import { WorkoutsDialog } from '../workoutsDialog';
import { WorkoutsContext } from '../../providers/workouts';
import { RRuleGenerator } from '../rRuleGenerator';

import './workoutScheduler.module.scss';
import { LoadingContext } from '../../providers/loading';

export const WorkoutScheduler = (): JSX.Element => {
  const { actions, state } = React.useContext(WorkoutsContext);
  const loadingCtx = React.useContext(LoadingContext);

  if (!state.selected) {
    return <></>;
  }

  const allDates = state.rrule.all();
  const onCancelClick = (event: React.MouseEvent<HTMLElement>): boolean => {
    actions.setSelected();
    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  const onSaveClick = async (event: React.MouseEvent<HTMLElement>): Promise<boolean> => {
    event.stopPropagation();
    event.preventDefault();
    loadingCtx.actions.show('Scheduling workouts');
    await actions.scheduleWorkouts();
    actions.setSelected();
    loadingCtx.actions.hide();
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
