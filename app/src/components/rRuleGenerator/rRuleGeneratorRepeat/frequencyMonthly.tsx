import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { RRuleFrequency } from '.';
import { FrequencyMonthlyOnDay } from './frequencyMonthlyOnDay';
import { FrequencyMonthlyOnThe } from './frequencyMonthlyOnThe';
import { IRepeatOnThe, IRRuleGeneratorRepeatMonthly } from './rRuleGeneratorRepeat.types';
import { NumberOptionsSelect } from '../../numberOptionsSelect';
import { TypographyBody } from '../../typographyBody';
import { ToggleOptionButtons } from '../../toggleOptionButtons';

export enum MonthlyRepeatMode {
  // eslint-disable-next-line no-unused-vars
  OnDay = 'OnDay',
  // eslint-disable-next-line no-unused-vars
  OnThe = 'OnThe'
}
export interface IFrequencyMonthlyProps {
  frequency: RRuleFrequency;
  repeat: IRRuleGeneratorRepeatMonthly;
  onChange: (repeat: IRRuleGeneratorRepeatMonthly) => void;
}

export const FrequencyMonthly = (props: IFrequencyMonthlyProps): JSX.Element => {
  const [repeatMode, setRepeatMode] = React.useState(MonthlyRepeatMode.OnDay);

  if (props.frequency !== RRuleFrequency.Monthly) {
    return <></>;
  }

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Grid container alignItems='center'>
            <Grid item xs>
              <TypographyBody
                prefix='Repeat every'
                sufix={props.repeat.every > 1 ? 'Months' : 'Month'}
              >
                <NumberOptionsSelect
                  optionsCount={12}
                  value={props.repeat.every.toString()}
                  onChange={(value: string) => {
                    props.onChange({ ...props.repeat, every: parseInt(value) });
                  }}
                />
              </TypographyBody>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container alignItems='center'>
            <Grid item xs>
              <ToggleOptionButtons
                exclusive
                value={repeatMode.toString()}
                onChange={(newMode) => {
                  setRepeatMode(MonthlyRepeatMode[newMode as keyof typeof MonthlyRepeatMode]);

                  props.onChange({
                    ...props.repeat,
                    onThe: { day: 'Monday', ordinal: 'First' },
                    onDay: 1
                  });
                }}
                options={[
                  { key: 'OnDay', displayName: 'On Day' },
                  { key: 'OnThe', displayName: 'On The' }
                ]}
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container alignItems='center'>
            <Grid item xs>
              <FrequencyMonthlyOnThe
                value={props.repeat.onThe as IRepeatOnThe}
                onChange={(repeat: IRepeatOnThe) => {
                  props.onChange({ ...props.repeat, onThe: repeat });
                }}
                mode={repeatMode}
              />
              <FrequencyMonthlyOnDay
                value={props.repeat.onDay as number}
                onChange={(repeat: number) => {
                  props.onChange({ ...props.repeat, onDay: repeat });
                }}
                mode={repeatMode}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
