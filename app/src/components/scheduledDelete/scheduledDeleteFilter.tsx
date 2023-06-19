import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import * as React from "react";
import { ScheduledDeleteProviderContext } from "./scheduledDeleteProvider/scheduledDeleteProvider.context";
import { getMonthName } from "./utils";

const currentDt: Date = new Date();
const currentYear: number = currentDt.getFullYear();
const currentMonth: number = currentDt.getMonth();

export interface IScheduledDeleteFilterProps {}

export const ScheduledDeleteFilter = (
  props: IScheduledDeleteFilterProps
): JSX.Element => {
  const { state, actions } = React.useContext(ScheduledDeleteProviderContext);
  const handleYearChange = (event: SelectChangeEvent) => {
    actions.setSelectedYear(parseInt(event.target.value));
  };
  const handleMonthChange = (event: SelectChangeEvent) => {
    actions.setSelectedMonth(parseInt(event.target.value));
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <div>
          <FormControl fullWidth>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={state.selectedYear.toString()}
              label="Year"
              onChange={handleYearChange}
            >
              {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
                <MenuItem value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid item xs={8}>
        <div>
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={state.selectedMonth.toString()}
              label="Month"
              onChange={handleMonthChange}
            >
              {[...Array(10)].map((_, n) => (
                <MenuItem value={n}>{getMonthName(n)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Grid>
    </Grid>
  );
};
