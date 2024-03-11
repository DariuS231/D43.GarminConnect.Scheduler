export interface ISelectedToolbarProps {
  selectedCount: number;
  singleEntityName: string;
  multipleEntityName: string;
  noSelectedEntityText: string;
  handleDeleteConfirm: () => void;
  getDeleteConfirmTexts: () => string[];
}
