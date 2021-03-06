import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EventRepeat from '@mui/icons-material/EventRepeat';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Schedule from '@mui/icons-material/Schedule';
import Coffee from '@mui/icons-material/Coffee';
import { WorkoutsContext } from '../../providers/workouts';

export const SchedulerSpeedDial = (): JSX.Element => {
  const [showSpeedDial, setShowSpeedDial] = React.useState(true);

  const { state, actions } = React.useContext(WorkoutsContext);

  if (!showSpeedDial || state.isOpen) {
    return <></>;
  }

  return (
    <SpeedDial
      ariaLabel='Garmin workouts recursive scheduler '
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon icon={<Schedule />} />}
    >
      <SpeedDialAction
        key='Schedule'
        icon={<EventRepeat />}
        tooltipTitle='Schedule workouts'
        onClick={() => actions.openApp()}
      />
      <SpeedDialAction
        key='Hide'
        icon={<VisibilityOff />}
        tooltipTitle='Hide'
        onClick={() => setShowSpeedDial(false)}
      />
      <SpeedDialAction
        key='Coffee'
        icon={<Coffee />}
        tooltipTitle='Buy me a coffee'
        onClick={() => window.open('https://www.buymeacoffee.com/dario17231M', '_blank')}
      />
    </SpeedDial>
  );
};
