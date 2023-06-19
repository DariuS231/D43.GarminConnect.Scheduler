import * as React from "react";
import { ICalendarItem } from "../../../providers/schedule";
import { ScheduledDeleteProviderContext } from "./scheduledDeleteProvider.context";
import { IScheduledDeleteProviderProps } from "./scheduledDeleteProvider.types";

const currentDt: Date = new Date();
const currentYear: number = currentDt.getFullYear();
const currentMonth: number = currentDt.getMonth();

export const ScheduledDeleteProviderProvider = (
  props: React.PropsWithChildren<IScheduledDeleteProviderProps>
): JSX.Element => {
  const [selectedYear, setSelectedYear] = React.useState(currentYear);
  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);
  const [items, setItems] = React.useState([] as ICalendarItem[]);
  const [selectedIds, setSelectedIds] = React.useState([] as number[]);

  const value = {
    state: { selectedYear, selectedMonth, items, selectedIds },
    actions: {
      setSelectedYear: (value: number) => {
        setSelectedYear(value);
      },
      setSelectedMonth: (value: number) => {
        setSelectedMonth(value);
      },
      setSelectedIds: (value: number[]) => {
        setSelectedIds(value);
      },
      setItems: (value: ICalendarItem[]) => {
        console.log(value)
        setItems(value);
      },
    },
  };

  return (
    <ScheduledDeleteProviderContext.Provider value={value}>
      {props.children}
    </ScheduledDeleteProviderContext.Provider>
  );
};
