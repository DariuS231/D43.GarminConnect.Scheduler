import * as React from 'react';
import { WorkoutsContext } from '.';
import './workouts.module.scss';

export const Workouts = (): JSX.Element => {
  const { state } = React.useContext(WorkoutsContext);

  return <div>Hello {state.workoutsValue}</div>;
};
