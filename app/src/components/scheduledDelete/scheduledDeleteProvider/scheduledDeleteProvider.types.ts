import { ICalendarItem } from "../../../providers/schedule";

export interface IScheduledDeleteProviderContext {
  state: {
    selectedYear: number;
    selectedMonth: number;
    selectedIds: number[];
    items: ICalendarItem[];
  };
  actions: {
    setSelectedYear: (value: number) => void;
    setSelectedMonth: (value: number) => void;
    setSelectedIds: (value: number[]) => void;
    setItems: (value: ICalendarItem[]) => void;
  };
}

export interface IScheduledDeleteProviderProps {}
