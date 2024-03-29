import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ViewListIcon from "@mui/icons-material/ViewList";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventBusy from "@mui/icons-material/EventBusy";
import Coffee from "@mui/icons-material/Coffee";
import { AppContext, Apps } from "../app";

export const SchedulerSpeedDial = (): JSX.Element => {
  const [showSpeedDial, setShowSpeedDial] = React.useState(true);

  const { state, actions } = React.useContext(AppContext);

  if (!showSpeedDial || state.isOpen) {
    return <></>;
  }
  //
  return (
    <SpeedDial
      ariaLabel="Garmin workouts manager"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon icon={<FitnessCenterIcon />} />}
    >
      <SpeedDialAction
        key="Schedule"
        icon={<ViewListIcon />}
        tooltipTitle="Manage Workouts"
        onClick={() => actions.openApp(Apps.Workouts)}
      />
      <SpeedDialAction
        key="EventBusy"
        icon={<EventBusy />}
        tooltipTitle="Delete scheduled workouts"
        onClick={() => actions.openApp(Apps.DeleteScheduled)}
      />
      <SpeedDialAction
        key="Hide"
        icon={<VisibilityOff />}
        tooltipTitle="Hide"
        onClick={() => setShowSpeedDial(false)}
      />
      <SpeedDialAction
        key="Coffee"
        icon={<Coffee />}
        tooltipTitle="Buy me a coffee"
        onClick={() =>
          window.open("https://www.buymeacoffee.com/dario17231M", "_blank")
        }
      />
    </SpeedDial>
  );
};
