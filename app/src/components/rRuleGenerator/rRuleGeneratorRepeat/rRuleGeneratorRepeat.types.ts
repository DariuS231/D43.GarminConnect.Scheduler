import { RRule, Options } from 'rrule';

export interface IRRuleGeneratorRepeatProps {
  rrule: RRule;
  onRruleChange: (newOptions: Partial<Options>) => void;
}

export interface IRRuleGeneratorRepeatDaily {
  every: number;
}
export interface IRRuleGeneratorRepeatWeekly {
  every: number;
  days: string[];
}
export interface IRepeatOnThe {
  ordinal: string;
  day: string;
}
export interface IRRuleGeneratorRepeatMonthly {
  every: number;
  onDay?: number;
  onThe?: IRepeatOnThe;
}

export enum MonthlyRepeatMode {
  // eslint-disable-next-line no-unused-vars
  OnDay = 'OnDay',
  // eslint-disable-next-line no-unused-vars
  OnThe = 'OnThe'
}
