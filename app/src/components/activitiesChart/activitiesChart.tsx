import * as React from "react";
import { IActivitiesChartProps } from ".";
import { WorkoutsDialog } from "../workoutsDialog";
import { LoadingContext } from "../../providers/loading";
import { alpha } from "@mui/material/styles";
import {
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ScheduleContext,
  ICalendarMonth,
  ICalendarItem,
} from "../../providers/schedule";
import DeleteIcon from "@mui/icons-material/Delete";

const currentDt: Date = new Date();
const currentYear: number = currentDt.getFullYear();
const currentMonth: number = currentDt.getMonth();

function getMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString(undefined, { month: "long" });
}

export const ActivitiesChart = (props: IActivitiesChartProps): JSX.Element => {
  const loadingCtx = React.useContext(LoadingContext);
  const scheduleCtx = React.useContext(ScheduleContext);
  const [selectedYear, setSelectedYear] = React.useState(currentYear);
  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);

  const [items, setItems] = React.useState([] as ICalendarItem[]);
  const [selectedIds, setSelectedIds] = React.useState([] as number[]);

  React.useEffect(() => {
    loadingCtx.actions.show();
    scheduleCtx.actions.getAll(selectedYear, selectedMonth).then((cal) => {
      setItems(cal.calendarItems.filter((ci) => ci.itemType === "workout"));
      loadingCtx.actions.hide();
    });
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(parseInt(event.target.value));
  };
  const handleMonthChange = (event: SelectChangeEvent) => {
    setSelectedMonth(parseInt(event.target.value));
  };
  const allSelected = selectedIds.length === items.length;
  return (
    <WorkoutsDialog title="Scheduled workouts" maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div>
            <FormControl fullWidth>
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear.toString()}
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
                value={selectedMonth.toString()}
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
        <Grid item xs={12}>
          <div>
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(selectedIds.length > 0 && {
                  bgcolor: (theme) =>
                    alpha(
                      theme.palette.primary.main,
                      theme.palette.action.activatedOpacity
                    ),
                }),
              }}
            >
              {selectedIds.length > 0 ? (
                <>
                  <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                  >
                    {selectedIds.length} selected
                  </Typography>
                  <Tooltip title="Delete">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Typography
                    sx={{ flex: "80%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                  >
                    Scheduled workouts
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    {items.length} scheduled for {getMonthName(selectedMonth)}{" "}
                    {selectedYear}
                  </Typography>
                </>
              )}
            </Toolbar>
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
                            : items.map((i) => i.id);
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
                  {items.map((item) => {
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
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </WorkoutsDialog>
  );
};
