import Typography from '@mui/material/Typography';
import * as React from 'react';

export interface IRRuleGeneratorSectionTitleProps {
  title: string;
}

export const RRuleGeneratorSectionTitle = (
  props: IRRuleGeneratorSectionTitleProps
): JSX.Element => {
  return (
    <Typography gutterBottom variant='h6' component='div'>
      {props.title}
    </Typography>
  );
};
