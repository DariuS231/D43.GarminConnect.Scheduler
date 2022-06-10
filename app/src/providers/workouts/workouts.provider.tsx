import * as React from 'react';
import { buildBaseOptions, WorkoutsContext } from '.';
import { IWorkout, IWorkoutsState } from './workouts.types';
import { WORKOUTS_MOCK } from './workouts.mock';
import { Frequency, RRule, Options } from 'rrule';

const cDate = new Date();
const fDate = new Date();

export const WorkoutsProvider = (props: React.PropsWithChildren<unknown>): JSX.Element => {
  const [workoutsState, setWorkoutsState] = React.useState({
    selected: undefined,
    workouts: [],
    isOpen: true,
    rrule: new RRule(buildBaseOptions(Frequency.WEEKLY, cDate, fDate))
  } as IWorkoutsState);

  const baseUrl = 'https://connect.garmin.com/modern/proxy/workout-service';

  const headers = {
    nk: 'NT',
    'x-app-ver': '4.54.0.14',
    accept: 'application/json, text/plain, */*'
  };

  const wait = async (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const get = async () => {
    if (window.location.href.startsWith('http://localhost:')) {
      await wait(3000);
      setWorkoutsState({ ...workoutsState, workouts: WORKOUTS_MOCK });
      return;
    }

    const resp = await fetch(
      `${baseUrl}/workouts?start=1&limit=9999&myWorkoutsOnly=true&sharedWorkoutsOnly=false`,
      { headers }
    );
    const workouts = (await resp.json()) as unknown as IWorkout[];
    setWorkoutsState({ ...workoutsState, workouts });
  };

  const scheduleWorkouts = async () => {
    const { selected, rrule } = workoutsState;

    if (!selected) {
      return;
    }

    const reqUrl = `${baseUrl}/schedule/${selected.workoutId}`;

    const allDates = rrule.all();

    for (let i = 0; i < allDates.length; i++) {
      const date = allDates[i];

      const resp = await fetch(reqUrl, {
        method: 'POST',
        body: JSON.stringify({
          date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
            .getDate()
            .toString()
            .padStart(2, '0')}`
        }),
        headers: {
          ...headers,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });

      const jsonResp = (await resp.json()) as unknown;
      console.log(jsonResp);
    }
  };

  const setSelected = (workout?: IWorkout) => {
    setWorkoutsState({
      ...workoutsState,
      selected: workout,
      rrule: new RRule(buildBaseOptions(Frequency.WEEKLY, cDate, fDate))
    });
  };

  const closeApp = () => {
    setWorkoutsState({ ...workoutsState, isOpen: false });
  };
  const changeRruleOptions = (newOptions: Partial<Options>) => {
    setWorkoutsState({ ...workoutsState, rrule: new RRule(newOptions) });
  };

  const value = {
    state: workoutsState,
    actions: {
      get,
      scheduleWorkouts,
      setSelected,
      closeApp,
      changeRruleOptions
    }
  };

  return <WorkoutsContext.Provider value={value}>{props.children}</WorkoutsContext.Provider>;
};
