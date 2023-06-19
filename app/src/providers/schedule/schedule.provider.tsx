import * as React from "react";
import { ScheduleContext, IScheduleProps, ICalendarMonth } from ".";
import { GarminApiContext } from "../garminApi";

export const ScheduleProvider = (
  props: React.PropsWithChildren<IScheduleProps>
): JSX.Element => {
  const { actions, state } = React.useContext(GarminApiContext);

  const getAll = async (
    year: number,
    month: number
  ): Promise<ICalendarMonth> => {
    const activities = await actions.get<ICalendarMonth>(
      `/calendar-service/year/${year}/month/${month}`
    );

    return activities;
  };
  const remove = async (id: number): Promise<void> => {
    await actions.remove(`/schedule/${id}`);
  };

  const value = {
    state: {},
    actions: { getAll, remove },
  };

  return (
    <ScheduleContext.Provider value={value}>
      {props.children}
    </ScheduleContext.Provider>
  );
};
