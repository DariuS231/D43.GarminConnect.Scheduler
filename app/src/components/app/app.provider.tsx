import * as React from "react";
import { AppContext, Apps, IAppContextState, IAppProps } from ".";

export const AppProvider = (
  props: React.PropsWithChildren<IAppProps>
): JSX.Element => {
  const [appValue, setAppValue] = React.useState({
    isOpen: false,
    app: Apps.None,
  } as IAppContextState);

  const closeApp = () => {
    setAppValue({
      isOpen: false,
      app: Apps.None,
    });
  };

  const openApp = (app: Apps) => {
    setAppValue({
      isOpen: true,
      app: app,
    });
  };

  const value = {
    state: appValue,
    actions: { openApp, closeApp },
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
