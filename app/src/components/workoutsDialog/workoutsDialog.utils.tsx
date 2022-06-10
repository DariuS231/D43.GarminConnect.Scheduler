import * as React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { SxProps } from '@mui/system/styleFunctionSx';
import { Theme } from '@mui/system';

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown, string>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const systemProps: SxProps<Theme> = {
  position: 'absolute',
  right: 8,
  top: 8,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  color: (theme: Theme): unknown => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return theme.palette.grey[500];
  }
} as SxProps<Theme>;
