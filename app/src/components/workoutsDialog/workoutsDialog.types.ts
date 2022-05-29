export interface IWorkoutsDialogActionButtonsProps {
  onCancelClick?: (event: React.MouseEvent<HTMLElement>) => boolean;
  onSaveClick?: (event: React.MouseEvent<HTMLElement>) => boolean;
}

export interface IWorkoutsDialog extends IWorkoutsDialogActionButtonsProps {
  title: string;
}
