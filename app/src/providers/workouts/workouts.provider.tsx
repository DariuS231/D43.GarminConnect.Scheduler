import * as React from "react";
import { buildBaseOptions, WorkoutsContext } from ".";
import {
  DictionaryString,
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
    selectedWorkouts: [],
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
    setWorkoutsState({ ...workoutsState, workouts, selectedWorkouts: [] });
  };

  const scheduleWorkouts = async () => {
    const { selected, rrule } = workoutsState;

    if (!selected) {
      return;
    }

    const allDates = rrule.all();

    const allRequests = allDates.map((date: Date) => {
      return actions.post<void, IScheduleWorkoutsBody>(
        `/workout-service/schedule/${selected.workoutId}`,
        {
          date: getDateFormat(date),
        }
      );
    });

    await Promise.all(allRequests);
  };

  const setSelected = (workout?: IWorkout) => {
    setWorkoutsState({
      ...workoutsState,
      selected: workout,
      selectedWorkouts: [],
      rrule: new RRule(buildBaseOptions(Frequency.WEEKLY, cDate, fDate)),
    });
  };

  const setSelectedToDelete = (workout: IWorkout) => {
    const indx = workoutsState.selectedWorkouts.indexOf(workout.workoutId);
    const newSelected =
      indx >= 0
        ? [
            ...workoutsState.selectedWorkouts.slice(0, indx),
            ...workoutsState.selectedWorkouts.slice(indx + 1),
          ]
        : [...workoutsState.selectedWorkouts, workout.workoutId];
    setWorkoutsState({
      ...workoutsState,
      selectedWorkouts: newSelected,
    });
  };

  const deleteSelectedWorkouts = async (): Promise<void> => {
    const requests = workoutsState.selectedWorkouts.map((id) => {
      actions.remove(`/workout-service/workout/${id}`);
    });

    await Promise.all(requests);

    await actions.wait(1000);

    const workouts = await actions.get<IWorkout[]>(
      "/workout-service/workouts?start=1&limit=9999&myWorkoutsOnly=true&sharedWorkoutsOnly=false"
    );
    setWorkoutsState({
      ...workoutsState,
      selectedWorkouts: [],
      workouts,
    });
  };

  const importWorkout = async (workoutData: DictionaryString) => {
    await actions.post<void, DictionaryString>(
      `/workout-service/workout`,
      workoutData
    );

    await actions.wait(1000);
    const workouts = await actions.get<IWorkout[]>(
      "/workout-service/workouts?start=1&limit=9999&myWorkoutsOnly=true&sharedWorkoutsOnly=false"
    );
    setWorkoutsState({
      ...workoutsState,
      selectedWorkouts: [],
      workouts,
    });
  };

  const getWorkoutDetails = async (workout: IWorkout) => {
    const workoutDetails = await actions.get<any>(
      `/workout-service/workout/${
        workout.workoutId
      }?includeAudioNotes=true&_=${Date.now()}`
    );
    return workoutDetails;
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
      getWorkoutDetails,
      importWorkout,
      setSelectedToDelete,
      deleteSelectedWorkouts,
    },
  };

  return (
    <WorkoutsContext.Provider value={value}>
      {props.children}
    </WorkoutsContext.Provider>
  );
};
