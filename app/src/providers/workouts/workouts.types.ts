import { RRule, Options } from 'rrule';
export interface SportType {
  sportTypeId: number;
  sportTypeKey: string;
  displayOrder: number;
}

export interface IWorkout {
  workoutId: number;
  ownerId: number;
  workoutName: string;
  description?: string;
  updateDate: Date;
  createdDate: Date;
  sportType: SportType;
  trainingPlanId?: string;
  poolLength: number;
  shared: boolean;
  estimated: boolean;
}

export type DictionaryString = {
  [key: string]: any;
};


export interface IWorkoutsState {
  workouts: IWorkout[];
  selectedWorkouts: number[];
  selected?: IWorkout;
  rrule: RRule;
}

export interface IWorkoutsActions {
  get: () => Promise<void>;
  setSelected: (workout?: IWorkout) => void;
  setSelectedToDelete: (workout?: IWorkout) => void;
  scheduleWorkouts: () => Promise<void>;
  getWorkoutDetails: (workout: IWorkout) => Promise<string>;
  importWorkout: (workoutData: DictionaryString) => Promise<void>;
  changeRruleOptions: (newOptions: Partial<Options>) => void;
  deleteSelectedWorkouts: () => Promise<void>
}

export interface IWorkoutsContext {
  state: IWorkoutsState;
  actions: IWorkoutsActions;
}

export interface IScheduleWorkoutsBody { date: string }

// export interface IWorkoutsProps { }
