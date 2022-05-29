import * as React from 'react';
import List from '@mui/material/List';
import { WorkoutsDialog } from '../workoutsDialog';
import { IWorkout, WorkoutsContext } from '../../providers/workouts';
import { WorkoutItem } from './workoutItem';

import './workoutsList.module.scss';

export const WorkoutsList = (): JSX.Element => {
  const { actions, state } = React.useContext(WorkoutsContext);

  if (state.selected) {
    return <></>;
  }

  React.useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const _ = actions.get().then(() => {
      console.log('Done');
    });
  }, []);

  return (
    <WorkoutsDialog title='Workouts'>
      <List sx={{ pt: 0 }}>
        {state.workouts.map((workout: IWorkout, i: number) => (
          <WorkoutItem workout={workout} key={i} />
        ))}
      </List>
    </WorkoutsDialog>
  );
};
