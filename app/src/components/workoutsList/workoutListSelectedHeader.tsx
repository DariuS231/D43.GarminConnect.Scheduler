import * as React from "react";
import { SelectedToolbar } from "../selectedToolbar";
import { LoadingContext } from "../../providers/loading";
import { IWorkout, WorkoutsContext } from "../../providers/workouts";

export interface IWorkoutListSelectedHeaderProps { }

export const WorkoutListSelectedHeader = (props: IWorkoutListSelectedHeaderProps): JSX.Element => {

  const loadingCtx = React.useContext(LoadingContext);
  const workoutCtx = React.useContext(WorkoutsContext);

  const {state, actions} = workoutCtx;

  const { workouts, selectedWorkouts } = state;
  console.log(state);

  const handleOk = async () => {
    loadingCtx.actions.show("Removing the selected scheduled workouts...");

    await actions.deleteSelectedWorkouts();
    loadingCtx.actions.hide();
  };


  const getDeleteConfirmTexts = (): string[] => {
    let names: string[] = [];
    selectedWorkouts.forEach(id => {
      const workout = workouts.find((w: IWorkout) => w.workoutId === id);
      if(workout){
        names.push(workout.workoutName);
      }
    });
   
    return names;
  };
  return (
    <SelectedToolbar
      getDeleteConfirmTexts={getDeleteConfirmTexts}
      handleDeleteConfirm={handleOk}
      multipleEntityName="Workouts"
      singleEntityName="Workout"
      noSelectedEntityText={`${workouts.length} workouts`}
      selectedCount={selectedWorkouts.length}
    />
  );
};