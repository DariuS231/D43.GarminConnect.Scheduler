import { Checkbox, TableCell, TableRow } from "@mui/material";
import * as React from "react";
import { ICalendarItem } from "../../providers/schedule";
import { ScheduledDeleteProviderContext } from "./scheduledDeleteProvider/scheduledDeleteProvider.context";

export interface IScheduledDeleteTableRowProps {
  item: ICalendarItem;
}

export const ScheduledDeleteTableRow = (
  props: IScheduledDeleteTableRowProps
): JSX.Element => {
  const { state, actions } = React.useContext(ScheduledDeleteProviderContext);
  const { selectedIds } = state;
  const { setSelectedIds } = actions;

  const { item } = props;
  const selectedIndex = selectedIds.indexOf(item.id);
  const isSelected = selectedIndex >= 0;
  return (
    <TableRow
      key={item.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        <Checkbox
          checked={isSelected}
          onClick={() => {
            setSelectedIds(
              isSelected
                ? [
                    ...selectedIds.slice(0, selectedIndex),
                    ...selectedIds.slice(selectedIndex + 1),
                  ]
                : [...selectedIds, item.id]
            );
          }}
        />
      </TableCell>
      <TableCell align="left">
        {new Date(item.date).toLocaleDateString()}
      </TableCell>
      <TableCell align="left">{item.sportTypeKey}</TableCell>
      <TableCell component="th" scope="row">
        {item.title}
      </TableCell>
    </TableRow>
  );
};
