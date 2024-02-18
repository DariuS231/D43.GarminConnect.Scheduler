export interface IWorkoutsManagementContext {
  state: { activeScreen: WorkoutScreen };
  actions: { setActive: (screen: WorkoutScreen) => void };
}

export interface IWorkoutsManagementProps {}

export enum WorkoutScreen {
  List,
  Schedule,
  Import,
}
