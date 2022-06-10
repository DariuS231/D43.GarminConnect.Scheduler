import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { IWorkoutsDialogActionButtonsProps } from './workoutsDialog.types';

export const WorkoutsDialogActionButtons = (
  props: IWorkoutsDialogActionButtonsProps
): JSX.Element => {
  const { onCancelClick, onSaveClick } = props;
  if (!onCancelClick && !onSaveClick) {
    return <></>;
  }

  return (
    <DialogActions>
      {onCancelClick && <Button onClick={props.onCancelClick}>Cancel</Button>}
      {onSaveClick && (
        <Button onClick={props.onSaveClick} disabled={props.disableSaveButton}>
          Save
        </Button>
      )}
    </DialogActions>
  );
};
