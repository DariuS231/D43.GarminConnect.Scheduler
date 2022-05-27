export interface IWorkoutsDialogActionButtonsProps {
  onCancelClick?: () => void;
  onSaveClick?: () => void;
}

export interface IWorkoutsDialog extends IWorkoutsDialogActionButtonsProps {
  title: string;
}
