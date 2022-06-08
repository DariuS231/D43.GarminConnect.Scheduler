import { Options, Frequency } from 'rrule';
export const convertToUTCDate = (dt: Date): Date => {
  return new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
};

export const buildBaseOptions = (freq: Frequency, cDate: Date, fDate: Date): Partial<Options> => {
  return {
    freq,
    dtstart: convertToUTCDate(cDate),
    until: convertToUTCDate(fDate),
    interval: 1,
    byweekday: []
  };
};
