import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import { IWorkoutsDialog } from "./workoutsDialog.types";
import { Transition, systemProps } from "./workoutsDialog.utils";
import { WorkoutsContext } from "../../providers/workouts";
import { WorkoutsDialogActionButtons } from "./workoutsDialogActionButtons";
import { Loading, LoadingContext } from "../../providers/loading";

import "./workoutsDialog.module.scss";

export const WorkoutsDialog = (
  props: React.PropsWithChildren<IWorkoutsDialog>
): JSX.Element => {
  const { actions } = React.useContext(WorkoutsContext);
  const loadingCtx = React.useContext(LoadingContext);

  const onCloseCLick = () => {
    actions.closeApp();
  };

  const { title, maxWidth } = props;
  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      maxWidth={maxWidth || "sm"}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton aria-label="close" onClick={onCloseCLick} sx={systemProps}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Loading />
      {!loadingCtx.state.isLoading && (
        <>
          <DialogContent dividers>{props.children}</DialogContent>
          <WorkoutsDialogActionButtons {...props} />
        </>
      )}
    </Dialog>
  );
};
