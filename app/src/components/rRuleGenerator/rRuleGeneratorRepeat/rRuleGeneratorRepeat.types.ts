export enum RRuleFrequency {
  // eslint-disable-next-line no-unused-vars
  Daily = 'Daily',
  // eslint-disable-next-line no-unused-vars
  Weekly = 'Weekly',
  // eslint-disable-next-line no-unused-vars
  Monthly = 'Monthly'
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
