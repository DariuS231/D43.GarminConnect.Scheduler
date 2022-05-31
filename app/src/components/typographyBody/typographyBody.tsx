import * as React from 'react';
import { ITypographyBodyProps } from '.';
import Typography from '@mui/material/Typography';

import './typographyBody.module.scss';

export const TypographyBody = (
  props: React.PropsWithChildren<ITypographyBodyProps>
): JSX.Element => {
  return (
    <Typography variant='body1' gutterBottom component='div'>
      {props.prefix && `${props.prefix} `}
      {props.children}
      {props.sufix && ` ${props.sufix}`}
    </Typography>
  );
};
