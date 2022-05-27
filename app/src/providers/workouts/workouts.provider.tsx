import * as React from 'react';
import { WorkoutsContext } from '.';
import { IWorkout, IWorkoutsState } from './workouts.types';
import { WORKOUTS_MOCK } from './workouts.mock';

export const WorkoutsProvider = (
  props: React.PropsWithChildren<unknown>
): JSX.Element => {
  const [workoutsState, setWorkoutsState] = React.useState({
    selected: undefined,
    workouts: [],
    isOpen: true
  } as IWorkoutsState);

  const baseUrl = 'https://connect.garmin.com/modern/proxy/workout-service';

  const headers = {
    nk: 'NT',
    'x-app-ver': '4.54.0.14',
    accept: 'application/json, text/plain, */*'
  };

  const get = async () => {
    if (window.location.href.startsWith('http://localhost:')) {
      setWorkoutsState({ ...workoutsState, workouts: WORKOUTS_MOCK });
      return;
    }

    const resp = await fetch(
      `${baseUrl}/workouts?start=1&limit=9999&myWorkoutsOnly=true&sharedWorkoutsOnly=false`,
      { headers }
    );
    const workouts = resp.json() as unknown as IWorkout[];
    setWorkoutsState({ ...workoutsState, workouts });
  };

  const scheduleWorkout = async (workout: IWorkout, dates: Date[]) => {
    const reqUrl = `${baseUrl}/schedule/${workout.workoutId}`;

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const resp = await fetch(reqUrl, {
        method: 'POST',
        body: JSON.stringify({
          date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }),
        headers: {
          ...headers,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });

      const jsonResp = resp.json();
      console.log(jsonResp);
    }
  };

  const setSelected = (workout?: IWorkout) => {
    setWorkoutsState({ ...workoutsState, selected: workout });
  };

  const closeApp = () => {
    setWorkoutsState({ ...workoutsState, isOpen: false });
  };

  const value = {
    state: workoutsState,
    actions: {
      get,
      scheduleWorkout,
      setSelected,
      closeApp
    }
  };

  return (
    <WorkoutsContext.Provider value={value}>
      {props.children}
    </WorkoutsContext.Provider>
  );
};
