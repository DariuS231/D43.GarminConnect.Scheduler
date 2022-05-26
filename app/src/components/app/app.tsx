import * as React from "react";
import { IAppProps } from ".";

import "./app.module.scss";

export const App = (props: IAppProps): JSX.Element => {
  return (
    <>
      <h1>Application</h1>
      <div>Hello World App!!!</div>
    </>
  );
};
