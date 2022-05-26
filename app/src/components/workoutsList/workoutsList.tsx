import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import DialogTitle from '@mui/material/DialogTitle';

import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { IWorkoutsListProps } from '.';

import './workoutsList.module.scss';

export const WorkoutsList = (props: IWorkoutsListProps): JSX.Element => {
  return (
    <>
      <DialogTitle>Workouts</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem
          secondaryAction={
            <IconButton edge='end'>
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
            primary='Single-line item'
            secondary={'Secondary text'}
          />
        </ListItem>
        <ListItem
          secondaryAction={
            <IconButton edge='end'>
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
            primary='Single-line item'
            secondary={'Secondary text'}
          />
        </ListItem>
        <ListItem
          secondaryAction={
            <IconButton edge='end'>
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
            primary='Single-line item'
            secondary={'Secondary text'}
          />
        </ListItem>
        <ListItem
          secondaryAction={
            <IconButton edge='end'>
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
            primary='Single-line item'
            secondary={'Secondary text'}
          />
        </ListItem>
      </List>
    </>
  );
};
