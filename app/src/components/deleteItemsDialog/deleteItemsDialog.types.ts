export interface IDeleteItemsDialogProps {
    handleClose: () => void;
    handleOk: () => void;
    singleEntityName: string;
    multipleEntityName: string;
    selectedItemsText: string[];
 }