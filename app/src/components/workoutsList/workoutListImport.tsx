import * as React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import "./workoutsList.module.scss";
import { Button, FormControl } from "@mui/material";
import { WorkoutsContext } from "../../providers/workouts";
import { LoadingContext } from "../../providers/loading";
import { WorkoutScreen, WorkoutsManagementContext } from "../../providers/workoutsManagement";

export interface IWorkoutListImportProps {}

export const WorkoutListImport = (
  props: IWorkoutListImportProps
): JSX.Element => {
  const screenCtx = React.useContext(WorkoutsManagementContext);

  const handleFileSelected = () => {};
  return (
    <FormControl sx={{ m: 1 }} variant="standard">
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={()=>{screenCtx.actions.setActive(WorkoutScreen.Import)}}
      >
        Import Workout
        
      </Button>
    </FormControl>
  );
};
