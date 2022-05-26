import * as React from 'react';
import { IAppProps } from '.';
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
// import { WorkoutsList } from '../workoutsList';

import './app.module.scss';
import { WorkoutScheduler } from '../workoutScheduler';

const Transition = React.forwardRef(function Transition (
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const App = (props: IAppProps): JSX.Element => {
  return (
    <>
      <Dialog open={true}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth={'sm'}>
        {/* <WorkoutsList /> */}
        <WorkoutScheduler />
      </Dialog>
    </>
  );
};
