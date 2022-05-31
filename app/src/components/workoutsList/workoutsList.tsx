import * as React from 'react';
import List from '@mui/material/List';
import { WorkoutsDialog } from '../workoutsDialog';
import { IWorkout, WorkoutsContext } from '../../providers/workouts';
import { WorkoutItem } from './workoutItem';
import { LoadingContext } from '../../providers/loading';

import './workoutsList.module.scss';

export const WorkoutsList = (): JSX.Element => {
  const workoutCtx = React.useContext(WorkoutsContext);
  const loadingCtx = React.useContext(LoadingContext);

  if (workoutCtx.state.selected) {
    return <></>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    loadingCtx.actions.show('Getting all workouts...');
    // eslint-disable-next-line no-unused-vars
    const _ = workoutCtx.actions.get().then(() => {
      loadingCtx.actions.hide();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WorkoutsDialog title='Workouts'>
      <List sx={{ pt: 0 }}>
        {workoutCtx.state.workouts.map((workout: IWorkout, i: number) => (
          <WorkoutItem workout={workout} key={i} />
        ))}
      </List>
    </WorkoutsDialog>
  );
};
