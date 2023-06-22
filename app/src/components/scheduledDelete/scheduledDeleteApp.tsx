import * as React from "react";
import { ScheduledDelete } from "./scheduledDelete";
import { ScheduledDeleteProviderProvider } from "./scheduledDeleteProvider/scheduledDeleteProvider.provider";

export interface IScheduledDeleteAppProps { }

export const ScheduledDeleteApp = (props: IScheduledDeleteAppProps): JSX.Element => {
  return (<ScheduledDeleteProviderProvider>
      <ScheduledDelete />
  </ScheduledDeleteProviderProvider>);
};