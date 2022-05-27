import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import { IWorkoutsDialog } from './workoutsDialog.types';
import { Transition, systemProps } from './workoutsDialog.utils';
import { WorkoutsContext } from '../../providers/workouts';
import { WorkoutsDialogActionButtons } from './workoutsDialogActionButtons';

import './workoutsDialog.module.scss';

export const WorkoutsDialog = (
  props: React.PropsWithChildren<IWorkoutsDialog>
): JSX.Element => {
  const { actions } = React.useContext(WorkoutsContext);

  const onCloseCLick = () => {
    actions.closeApp();
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {props.title}
        <IconButton aria-label='close' onClick={onCloseCLick} sx={systemProps}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{props.children}</DialogContent>
      <WorkoutsDialogActionButtons {...props} />
    </Dialog>
  );
};
