import * as React from "react";
import { IWorkoutImporterProps } from ".";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { WorkoutsDialog } from "../workoutsDialog";
import { DictionaryString, WorkoutsContext } from "../../providers/workouts";
import { LoadingContext } from "../../providers/loading";
import {
  Box,
  Button,
  DialogContentText,
  Divider,
  FormControl,
  Grid,
  TextField,
  styled,
} from "@mui/material";
import {
  WorkoutScreen,
  WorkoutsManagementContext,
} from "../../providers/workoutsManagement";
import {
  VisuallyHiddenInput,
  createWorkoutPayload,
} from "./workoutImporter.utils";

import * as classes from "./workoutImporter.module.scss";

export const WorkoutImporter = (props: IWorkoutImporterProps): JSX.Element => {
  const { actions, state } = React.useContext(WorkoutsContext);
  const loadingCtx = React.useContext(LoadingContext);
  const screenCtx = React.useContext(WorkoutsManagementContext);

  const [workoutObject, setWorkoutObject] = React.useState(
    undefined as DictionaryString | undefined
  );

  if (screenCtx.state.activeScreen !== WorkoutScreen.Import) {
    return <></>;
  }

  const onCancelClick = (event: React.MouseEvent<HTMLElement>): boolean => {
    setWorkoutObject(undefined);
    screenCtx.actions.setActive(WorkoutScreen.List);
    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  const onSaveClick = async (
    event: React.MouseEvent<HTMLElement>
  ): Promise<boolean> => {
    if (workoutObject) {
      loadingCtx.actions.show("Importing the new workout...");
      await actions.importWorkout(workoutObject);
      setWorkoutObject(undefined);
      loadingCtx.actions.hide();
      screenCtx.actions.setActive(WorkoutScreen.List);
    }
    return false;
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        if (e.target && e.target.result) {
          let payload = createWorkoutPayload(
            JSON.parse(e.target.result.toString())
          );
          if (payload["workoutName"]) {
            setWorkoutObject(payload);
          } else {
            alert("Incorrect Workout format...");
          }
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (workoutObject) {
      setWorkoutObject({ ...workoutObject, workoutName: e.target.value });
    }
  };

  return (
    <WorkoutsDialog
      title={`Import a new workout`}
      onCancelClick={onCancelClick}
      onSaveClick={onSaveClick}
      disableSaveButton={!workoutObject || !workoutObject["workoutName"]}
    >
      <DialogContentText>
        Select the workout file and set a name.
      </DialogContentText>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ flexGrow: 1, paddingBottom: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1 }} variant="standard">
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Import Workout
                  <VisuallyHiddenInput
                    type="file"
                    accept="application/JSON"
                    onChange={handleFileSelection}
                  />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.workoutImporterInput}>
                <TextField
                  fullWidth
                  required
                  label="Workout name"
                  variant="filled"
                  disabled={!workoutObject}
                  value={
                    workoutObject && (workoutObject["workoutName"] as string)
                  }
                  onChange={handleNameInputChange}
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </WorkoutsDialog>
  );
};
