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
import {
  Checkbox,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  WorkoutScreen,
  WorkoutsManagementContext,
} from "../../providers/workoutsManagement";
import { alpha, withStyles } from "@mui/material/styles";

export interface IWorkoutItemProps {
  workout: IWorkout;
}

export const WorkoutItem = (props: IWorkoutItemProps): JSX.Element => {
  const { actions, state } = React.useContext(WorkoutsContext);
  const screenCtx = React.useContext(WorkoutsManagementContext);

  const { workout } = props;

  const isSelected = state.selectedWorkouts.indexOf(workout.workoutId) !== -1;

  const onRepeatIconClick = (event: React.MouseEvent<HTMLElement>): boolean => {
    actions.setSelected(workout);
    screenCtx.actions.setActive(WorkoutScreen.Schedule);
    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  const onDownloadIconClick = (
    event: React.MouseEvent<HTMLElement>
  ): boolean => {
    actions.getWorkoutDetails(workout).then((data) => {
      const jsonBlob = new Blob([JSON.stringify(data)], {
        type: "text/plain;charset=utf-8",
      });
      const url = window.URL.createObjectURL(jsonBlob);
      const a = document.createElement("a");
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
  };

  const onItemClick = (event: React.MouseEvent<HTMLElement>): boolean => {
    actions.setSelectedToDelete(workout);
    return false;
  };

  return (
    <ListItem
      sx={{
        padding: 0,
        marginBottom: '1px',
        ...(isSelected && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <ListItemButton onClick={onItemClick} dense>
        <ListItemAvatar>
          <Avatar>
            <FitnessCenter />
          </Avatar>
        </ListItemAvatar>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isSelected}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText  sx={{ paddingRight: '96px' }}
          primary={workout.workoutName}
          secondary={workout.description}
        />
        <ListItemSecondaryAction sx={{ paddingRight: '0px' }}>
          <IconButton onClick={onRepeatIconClick}>
            <EventRepeatIcon />
          </IconButton>
          <IconButton onClick={onDownloadIconClick}>
            <DownloadIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  );
};
