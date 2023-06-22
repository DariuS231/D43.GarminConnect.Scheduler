import * as React from "react";
import {
  ScheduleContext,
  IScheduleProps,
  ICalendarMonth,
  ICalendarItem,
} from ".";
import { GarminApiContext } from "../garminApi";

export const ScheduleProvider = (
  props: React.PropsWithChildren<IScheduleProps>
): JSX.Element => {
  const { actions, state } = React.useContext(GarminApiContext);

  const getAll = async (
    year: number,
    month: number
  ): Promise<ICalendarMonth> => {
    const cal = await actions.get<ICalendarMonth>(
      `/calendar-service/year/${year}/month/${month}`
    );

    let newItems: ICalendarItem[] = [];
    cal.calendarItems.forEach((ci) => {
      if (ci.itemType === "workout") {
        ci.localDate = new Date(ci.date);
        if (ci.localDate.getMonth() === month) {
          newItems.push(ci);
        }
      }
    });
    return { ...cal, calendarItems: newItems };
  };

  const remove = async (id: number): Promise<void> => {
    await actions.remove(`/workout-service/schedule/${id}`);
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
