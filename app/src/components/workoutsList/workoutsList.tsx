import * as React from "react";
import List from "@mui/material/List";
import { WorkoutsDialog } from "../workoutsDialog";
import { IWorkout, WorkoutsContext } from "../../providers/workouts";
import { WorkoutItem } from "./workoutItem";
import { LoadingContext } from "../../providers/loading";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import "./workoutsList.module.scss";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";

export const WorkoutsList = (): JSX.Element => {
  const workoutCtx = React.useContext(WorkoutsContext);
  const loadingCtx = React.useContext(LoadingContext);

  const [searchText, setSearchText] = React.useState("");

  const handleClickShowPassword = () => setSearchText("");

  if (workoutCtx.state.selected) {
    return <></>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    loadingCtx.actions.show("Getting all workouts...");
    // eslint-disable-next-line no-unused-vars
    const _ = workoutCtx.actions.get().then(() => {
      loadingCtx.actions.hide();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const workouts = searchText
    ? workoutCtx.state.workouts.filter(
        (wk) =>
          wk.workoutName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 ||
          (wk.description &&
            wk.description.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
      )
    : workoutCtx.state.workouts;
  return (
    <WorkoutsDialog title="Workouts">
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <Input
          id="standard-adornment-amount"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            searchText && (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleClickShowPassword}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }
          sx={{
            paddingRight: '5px',
            input: { boxShadow: "none", border: "none" },
          }}
          value={searchText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value);
          }}
        />
      </FormControl>

      <List sx={{ pt: 0 }}>
        {workouts.map((workout: IWorkout, i: number) => (
          <WorkoutItem workout={workout} key={i} />
        ))}
      </List>
    </WorkoutsDialog>
  );
};
