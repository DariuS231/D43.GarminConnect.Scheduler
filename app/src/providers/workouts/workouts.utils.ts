import { Options, Frequency } from 'rrule';

/**
 * rrule works with "floating" dates stored as UTC: a calendar day D is
 * represented as D 00:00 UTC, and rrule reads/writes only the UTC fields.
 * Reading those dates with local getters (getDate, toLocaleDateString, the
 * MUI date picker, ...) in a timezone west of UTC (e.g. the Americas) yields
 * the previous day. Always convert at the boundary with these two helpers.
 */

/** Local calendar date (e.g. from a date picker or `new Date()`) -> rrule UTC date. */
export const convertToUTCDate = (dt: Date): Date => {
  return new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
};

/** rrule UTC date -> local Date at midnight of the same calendar day. */
export const convertFromUTCDate = (dt: Date): Date => {
  return new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate());
};

/** `dtstart` and `until` must already be rrule UTC dates (see convertToUTCDate). */
export const buildBaseOptions = (freq: Frequency, dtstart: Date, until: Date): Partial<Options> => {
  return {
    freq,
    dtstart,
    until,
    interval: 1,
    byweekday: []
  };
};
