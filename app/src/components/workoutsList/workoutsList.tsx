import * as React from "react";
import List from "@mui/material/List";
import { WorkoutsDialog } from "../workoutsDialog";
import { IWorkout, WorkoutsContext } from "../../providers/workouts";
import { WorkoutItem } from "./workoutItem";
import { LoadingContext } from "../../providers/loading";

import "./workoutsList.module.scss";
import { Alert, Box } from "@mui/material";
import { WorkoutsListFilter } from "./workoutsListFilter";
import { WorkoutListImport } from "./workoutListImport";
import { WorkoutListSelectedHeader } from "./workoutListSelectedHeader";
import {
  WorkoutScreen,
  WorkoutsManagementContext,
} from "../../providers/workoutsManagement";

export const WorkoutsList = (): JSX.Element => {
  const workoutCtx = React.useContext(WorkoutsContext);
  const loadingCtx = React.useContext(LoadingContext);
  const screenCtx = React.useContext(WorkoutsManagementContext);

  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    loadingCtx.actions.show("Getting all workouts...");
    const _ = workoutCtx.actions.get().then(() => {
      loadingCtx.actions.hide();
    });
  }, []);

  if (screenCtx.state.activeScreen !== WorkoutScreen.List) {
    return <></>;
  }

  const workouts = searchText
    ? workoutCtx.state.workouts.filter(
        (wk) =>
          wk.workoutName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 ||
          (wk.description &&
            wk.description.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
      )
    : workoutCtx.state.workouts;

  return (
    <WorkoutsDialog title="Workouts" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          p: 1,
        }}
      >
        <Box sx={{ p: 1, m: 1, flexGrow: 1 }}>
          <WorkoutsListFilter
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </Box>
        <Box sx={{ p: 1, m: 1 }}>
          <WorkoutListImport />
        </Box>
      </Box>

      {workouts.length > 0 ? (
        <>
          <WorkoutListSelectedHeader />
          <Box sx={{ pt: 0 }}>
            <List sx={{}}>
              {workouts.map((workout: IWorkout, i: number) => (
                <WorkoutItem workout={workout} key={i} />
              ))}
            </List>
          </Box>
        </>
      ) : (
        <Alert severity="info">No workouts found.</Alert>
      )}
    </WorkoutsDialog>
  );
};
