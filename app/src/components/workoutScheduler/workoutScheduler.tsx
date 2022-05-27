import * as React from 'react';
import { IWorkoutSchedulerProps } from '.';
import RRuleGeneratorTS, { translations } from 'react-rrule-generator-ts';
import 'react-rrule-generator-ts/dist/index.css';
import DialogContentText from '@mui/material/DialogContentText';

import './workoutScheduler.module.scss';
import { WorkoutsDialog } from '../workoutsDialog';
import { WorkoutsContext } from '../../providers/workouts';

export const WorkoutScheduler = (
  props: IWorkoutSchedulerProps
): JSX.Element => {
  const { actions, state } = React.useContext(WorkoutsContext);

  if (!state.selected) {
    return <></>;
  }

  const onCancelClick = () => {
    actions.setSelected();
  };

  const onSaveClick = () => {
    actions.setSelected();
  };

  return (
    <WorkoutsDialog
      title={`Schedule ${state.selected?.workoutName}`}
      onCancelClick={onCancelClick}
      onSaveClick={onSaveClick}
    >
      <DialogContentText>{state.selected?.description}</DialogContentText>
      <RRuleGeneratorTS
        onChange={(rrule: any) => console.log(rrule)}
        config={{
          hideStart: false,
          repeat: ['Daily', 'Monthly', 'Weekly'],
          end: ['After', 'On date'],
          weekStartsOnSunday: true,
          hideError: true
        }}
        translations={translations.english}
      />
    </WorkoutsDialog>
  );
};
