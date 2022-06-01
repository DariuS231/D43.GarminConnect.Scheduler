import { RRule } from 'rrule';

export interface IRRuleGeneratorRepeatProps {
  rrule: RRule;
  onRruleChange: (rrule: RRule) => void;
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
