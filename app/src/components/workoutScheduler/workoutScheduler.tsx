import * as React from 'react';
import { IWorkoutSchedulerProps } from '.';
import RRuleGeneratorTS, { translations } from 'react-rrule-generator-ts';
import 'react-rrule-generator-ts/dist/index.css';
import DialogTitle from '@mui/material/DialogTitle';

import './workoutScheduler.module.scss';

export const WorkoutScheduler = (
  props: IWorkoutSchedulerProps
): JSX.Element => {
  return (
    <>
      <DialogTitle>Schedule a Workouts</DialogTitle>
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
    </>
  );
};
