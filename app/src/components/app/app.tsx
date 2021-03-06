import * as React from 'react';
import { WorkoutsList } from '../workoutsList';
import { WorkoutScheduler } from '../workoutScheduler';
import { WorkoutsContext } from '../../providers/workouts';

import './app.module.scss';

export const App = (): JSX.Element => {
  const { state } = React.useContext(WorkoutsContext);

  if (!state.isOpen) {
    return <></>;
  }

  return (
    <>
      <WorkoutsList />
      <WorkoutScheduler />
    </>
  );
};
