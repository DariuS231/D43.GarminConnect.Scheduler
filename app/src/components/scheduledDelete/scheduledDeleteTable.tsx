import {
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";
import { ICalendarItem } from "../../providers/schedule";
import { ScheduledDeleteProviderContext } from "./scheduledDeleteProvider/scheduledDeleteProvider.context";
import { ScheduledDeleteTableHeader } from "./scheduledDeleteTableHeader";
import { ScheduledDeleteTableRow } from "./scheduledDeleteTableRow";

export interface IScheduledDeleteTableProps {}

export const ScheduledDeleteTable = (
  props: IScheduledDeleteTableProps
): JSX.Element => {
  const { state, actions } = React.useContext(ScheduledDeleteProviderContext);
  const { selectedIds, items } = state;
  const { setSelectedIds } = actions;

  const allSelected = selectedIds.length === items.length;

  return (
    <Grid container spacing={2} paddingTop={3}>
      <Grid item xs={12}>
        <ScheduledDeleteTableHeader />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    checked={allSelected}
                    onClick={() => {
                      const newSelected = allSelected
                        ? []
                        : items.map((i: ICalendarItem) => i.id);
                      setSelectedIds(newSelected);
                    }}
                  />
                </TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Sport Type</TableCell>
                <TableCell align="left">Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item: ICalendarItem, ind: number) => (
                <ScheduledDeleteTableRow item={item} key={ind} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
