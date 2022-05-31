import * as React from 'react';
import { RRuleGeneratorEnd } from './rRuleGeneratorEnd';
import { RRuleGeneratorRepeat } from './rRuleGeneratorRepeat';
import { RRuleGeneratorStart } from './rRuleGeneratorStart';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import './rRuleGenerator.module.scss';
import { RRuleGeneratorSectionTitle } from './rRuleGeneratorSectionTitle';

export const RRuleGenerator = (): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1, paddingBottom: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <RRuleGeneratorSectionTitle title='Start' />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <RRuleGeneratorStart />
            </Grid>
          </Grid>
        </Box>
        <Divider variant='fullWidth' />
        <Box sx={{ flexGrow: 1, paddingBottom: 3, paddingTop: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <RRuleGeneratorSectionTitle title='Repeat' />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <RRuleGeneratorRepeat />
            </Grid>
          </Grid>
        </Box>
        <Divider variant='fullWidth' />
        <Box sx={{ flexGrow: 1, paddingTop: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <RRuleGeneratorSectionTitle title='End' />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <RRuleGeneratorEnd />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
