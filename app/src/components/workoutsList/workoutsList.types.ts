import { IWorkout } from '../../providers/workouts';

export interface IWorkoutsListProps {
  workouts: IWorkout[];
  onWorkoutSelected(workout: IWorkout): void;
}
