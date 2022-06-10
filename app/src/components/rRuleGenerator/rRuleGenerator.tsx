import * as React from 'react';
import { RRuleGeneratorRepeat } from './rRuleGeneratorRepeat';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { RRuleGeneratorDatePicker } from './rRuleGeneratorDatePicker';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Options } from 'rrule';
import { RRuleGeneratorSectionTitle } from './rRuleGeneratorSectionTitle';
import Typography from '@mui/material/Typography';
import { WorkoutsContext } from '../../providers/workouts';

import './rRuleGenerator.module.scss';

const cDate = new Date();
const fDate = new Date();

fDate.setMonth(cDate.getMonth() + 1);

export const RRuleGenerator = (): JSX.Element => {
  const { actions, state } = React.useContext(WorkoutsContext);
  const { rrule } = state;
  const { dtstart, until } = rrule.options;

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
              <RRuleGeneratorDatePicker
                value={dtstart}
                onChange={(value) => {
                  if (value) {
                    actions.changeRruleOptions({ ...rrule.options, dtstart: value });
                  }
                }}
              />
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
              <RRuleGeneratorRepeat
                rrule={rrule}
                onRruleChange={(newOptions: Partial<Options>) => {
                  actions.changeRruleOptions(newOptions);
                }}
              />
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
              <RRuleGeneratorDatePicker
                value={until as Date}
                minDate={dtstart}
                onChange={(value) => {
                  if (value) {
                    actions.changeRruleOptions({ ...rrule.options, until: value });
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider variant='fullWidth' />
        <Box sx={{ flexGrow: 1, paddingTop: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='body1' gutterBottom>
                {rrule.toText()}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <ul>
                  {rrule.all().map((a, i) => (
                    <li key={i}>{a.toDateString()}</li>
                  ))}
                </ul>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
