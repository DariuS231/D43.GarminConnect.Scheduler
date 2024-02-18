import * as React from "react";
import {
  WorkoutsManagementContext,
  IWorkoutsManagementProps,
  WorkoutScreen,
} from ".";
import { WorkoutsProvider } from "../workouts/workouts.provider";

export const WorkoutsManagementProvider = (
  props: React.PropsWithChildren<IWorkoutsManagementProps>
): JSX.Element => {
  const [activeScreen, setActiveScreen] = React.useState(WorkoutScreen.List);

  const setActive = React.useCallback((screen: WorkoutScreen) => {
    setActiveScreen(screen);
  }, []);
  const value = {
    state: { activeScreen },
    actions: { setActive },
  };

  return (
    <WorkoutsManagementContext.Provider value={value}>
      <WorkoutsProvider>{props.children}</WorkoutsProvider> 
    </WorkoutsManagementContext.Provider>
  );
};
