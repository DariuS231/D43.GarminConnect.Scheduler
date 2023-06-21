export enum Apps {
  Workouts,
  DeleteScheduled,
  None,
}

export interface IAppContextState {
  isOpen: boolean;
  app: Apps;
}
export interface IAppContextActions {
  closeApp: () => void;
  openApp: (app: Apps) => void;
}
export interface IAppContext {
  state: IAppContextState;
  actions: IAppContextActions;
}

export interface IAppProps {}
