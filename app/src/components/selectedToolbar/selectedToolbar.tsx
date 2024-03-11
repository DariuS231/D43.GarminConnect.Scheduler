import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

import { ISelectedToolbarProps } from ".";
import { DeleteItemsDialog } from "../deleteItemsDialog";

export const SelectedToolbar = (props: ISelectedToolbarProps): JSX.Element => {
  const {
    selectedCount,
    getDeleteConfirmTexts,
    handleDeleteConfirm,
    multipleEntityName,
    noSelectedEntityText,
    singleEntityName,
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedCount > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedCount > 0 ? (
        <>
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selectedCount}{" "}
            {selectedCount === 1 ? singleEntityName : multipleEntityName}{" "}
            selected
          </Typography>
          <>
            <Tooltip title="Delete">
              <IconButton onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {open && (
              <DeleteItemsDialog
                multipleEntityName={multipleEntityName}
                selectedItemsText={getDeleteConfirmTexts()}
                singleEntityName={singleEntityName}
                handleClose={handleClose}
                handleOk={()=>{
                    handleClose();
                    handleDeleteConfirm();
                }}
              />
            )}
          </>
        </>
      ) : (
        <>
          <Typography
            sx={{ flex: "80%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {multipleEntityName}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {noSelectedEntityText}
          </Typography>
        </>
      )}
    </Toolbar>
  );
};
