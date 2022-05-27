import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { IWorkout, WorkoutsContext } from '../../providers/workouts';

export interface IWorkoutItemProps {
  workout: IWorkout;
}

export const WorkoutItem = (props: IWorkoutItemProps): JSX.Element => {
  const { actions } = React.useContext(WorkoutsContext);
  const { workout } = props;

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge='end'
          onClick={() => {
            actions.setSelected(workout);
          }}
        >
          <EventRepeatIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <FitnessCenter />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={workout.workoutName}
        secondary={workout.description}
      />
    </ListItem>
  );
};
