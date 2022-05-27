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

export interface IWorkoutsState {
  workouts: IWorkout[];
  selected?: IWorkout;
  isOpen: boolean;
}

export interface IWorkoutsActions {
  get: () => Promise<void>;
  setSelected: (workout?: IWorkout) => void;
  scheduleWorkout: (workout: IWorkout, dates: Date[]) => Promise<void>;
  closeApp: () => void;
}

export interface IWorkoutsContext {
  state: IWorkoutsState;
  actions: IWorkoutsActions;
}

// export interface IWorkoutsProps { }
