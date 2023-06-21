import * as React from "react";
import { buildBaseOptions, WorkoutsContext } from ".";
import {
  IScheduleWorkoutsBody,
  IWorkout,
  IWorkoutsState,
} from "./workouts.types";
import { WORKOUTS_MOCK } from "./workouts.mock";
import { Frequency, RRule, Options } from "rrule";
import { GarminApiContext, getDateFormat } from "../garminApi";

const cDate = new Date();
const fDate = new Date();

export const WorkoutsProvider = (
  props: React.PropsWithChildren<unknown>
): JSX.Element => {
  const { actions, state } = React.useContext(GarminApiContext);
  const [workoutsState, setWorkoutsState] = React.useState({
    selected: undefined,
    workouts: [],
    rrule: new RRule(buildBaseOptions(Frequency.WEEKLY, cDate, fDate)),
  } as IWorkoutsState);

  const get = async () => {
    if (state.isLocalHost) {
      await actions.wait(3000);
      setWorkoutsState({ ...workoutsState, workouts: WORKOUTS_MOCK });
      return;
    }

    const workouts = await actions.get<IWorkout[]>(
      "/workout-service/workouts?start=1&limit=9999&myWorkoutsOnly=true&sharedWorkoutsOnly=false"
    );
    setWorkoutsState({ ...workoutsState, workouts });
  };

  const scheduleWorkouts = async () => {
    const { selected, rrule } = workoutsState;

    if (!selected) {
      return;
    }

    const allDates = rrule.all();

    for (let i = 0; i < allDates.length; i++) {
      const date = allDates[i];

      const body = {
        date: getDateFormat(date)
      };
      const newItem = await actions.post<void, IScheduleWorkoutsBody>(
        `/workout-service/schedule/${selected.workoutId}`,
        body
      );

      console.log(newItem);
    }
  };

  const setSelected = (workout?: IWorkout) => {
    setWorkoutsState({
      ...workoutsState,
      selected: workout,
      rrule: new RRule(buildBaseOptions(Frequency.WEEKLY, cDate, fDate)),
    });
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
      changeRruleOptions,
    },
  };

  return (
    <WorkoutsContext.Provider value={value}>
      {props.children}
    </WorkoutsContext.Provider>
  );
};
