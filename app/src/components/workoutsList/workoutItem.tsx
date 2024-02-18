import * as React from "react";
import ListItem from "@mui/material/ListItem";
import FitnessCenter from "@mui/icons-material/FitnessCenter";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import DownloadIcon from "@mui/icons-material/Download";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { IWorkout, WorkoutsContext } from "../../providers/workouts";
import { Checkbox, ListItemButton, ListItemIcon } from "@mui/material";
import { WorkoutScreen, WorkoutsManagementContext } from "../../providers/workoutsManagement";

export interface IWorkoutItemProps {
  workout: IWorkout;
}

export const WorkoutItem = (props: IWorkoutItemProps): JSX.Element => {
  const { actions, state } = React.useContext(WorkoutsContext);
  const screenCtx = React.useContext(WorkoutsManagementContext);
  
  const { workout } = props;

  return (
    <ListItem
      sx={{ padding: "8px 16px" }}
      secondaryAction={
        <>
          <IconButton
            edge="end"
            onClick={(event: React.MouseEvent<HTMLElement>): boolean => {
              actions.setSelected(workout);
              screenCtx.actions.setActive(WorkoutScreen.Schedule);
              event.stopPropagation();
              event.preventDefault();
              return false;
            }}
          >
            <EventRepeatIcon />
          </IconButton>
          <IconButton
            edge="end"
            onClick={(event: React.MouseEvent<HTMLElement>): boolean => {
              actions.getWorkoutDetails(workout).then((data) => {
                const jsonBlob = new Blob([JSON.stringify(data)], {
                  type: "text/plain;charset=utf-8",
                });
                const url = window.URL.createObjectURL(jsonBlob);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.download = `${workout.workoutName}.json`;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
              });
              event.stopPropagation();
              event.preventDefault();
              return false;
            }}
          >
            <DownloadIcon />
          </IconButton>
        </>
      }
    >
      <ListItemButton
        onClick={() => {
          actions.setSelectedToDelete(workout);
        }}
        dense
      >
        <ListItemAvatar>
          <Avatar>
            <FitnessCenter />
          </Avatar>
        </ListItemAvatar>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={state.selectedWorkouts.indexOf(workout.workoutId) !== -1}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText
          primary={workout.workoutName}
          secondary={workout.description}
        />
      </ListItemButton>
    </ListItem>
  );
};
