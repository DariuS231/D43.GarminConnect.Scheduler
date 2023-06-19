export interface IWorkoutsDialogActionButtonsProps {
  onCancelClick?: (event: React.MouseEvent<HTMLElement>) => boolean;
  onSaveClick?: (
    event: React.MouseEvent<HTMLElement>
  ) => boolean | Promise<boolean>;
  disableSaveButton?: boolean;
}

export interface IWorkoutsDialog extends IWorkoutsDialogActionButtonsProps {
  title: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}
