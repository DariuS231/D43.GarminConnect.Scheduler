import * as React from 'react';
import { WorkoutsContext } from '.';

export const WorkoutsProvider = (
  props: React.PropsWithChildren<unknown>
): JSX.Element => {
  const [workoutsValue, setWorkoutsValue] = React.useState('');

  const set = React.useCallback((newValue: string) => {
    setWorkoutsValue(newValue);
  }, []);
  const value = {
    state: { workoutsValue },
    actions: { set }
  };

  return (
    <WorkoutsContext.Provider value={value}>
      {props.children}
    </WorkoutsContext.Provider>
  );
};
