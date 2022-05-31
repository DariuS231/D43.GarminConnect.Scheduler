import * as React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import { WorkoutsDialog } from '../workoutsDialog';
import { WorkoutsContext } from '../../providers/workouts';
import { RRuleGenerator } from '../rRuleGenerator';

import './workoutScheduler.module.scss';

export const WorkoutScheduler = (): JSX.Element => {
  // const [rule, setRule] = React.useState('');
  const { actions, state } = React.useContext(WorkoutsContext);

  if (!state.selected) {
    return <></>;
  }

  const onCancelClick = (event: React.MouseEvent<HTMLElement>): boolean => {
    actions.setSelected();
    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  const onSaveClick = (event: React.MouseEvent<HTMLElement>): boolean => {
    actions.setSelected();
    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  return (
    <WorkoutsDialog
      title={`Schedule ${state.selected?.workoutName}`}
      onCancelClick={onCancelClick}
      onSaveClick={onSaveClick}
    >
      <DialogContentText>{state.selected?.description}</DialogContentText>
      <RRuleGenerator />
    </WorkoutsDialog>
  );
};
