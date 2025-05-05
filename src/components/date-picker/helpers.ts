import { format, parse, setHours, setMinutes, setSeconds } from 'date-fns';
import { BuildTimeOptions } from './interfaces';

export const AM_VALUE = 0;
export const PM_VALUE = 1;

export const START_YEAR = 1900;
export const END_YEAR = 2100;
export const MONTHS_IN_YEAR = 12;
export const HOURS_IN_HALF_DAY = 12;
export const HOURS_IN_DAY = 24;
export const SECONDS_IN_MINUTE = 60;

const HOUR_START_INDEX = 11;
const HOUR_END_INDEX = 13;
const MINUTE_START_INDEX = 14;
const MINUTE_END_INDEX = 16;
const SECOND_START_INDEX = 17;
const SECOND_END_INDEX = 19;
const AMPM_START_INDEX = 24;
const AMPM_END_INDEX = 26;
const PAD_LENGTH = 2;

export function buildTime(options: BuildTimeOptions) {
  const { use12HourFormat, value, formatStr, hour, minute, second, ampm } = options;
  let date: Date;
  if (use12HourFormat) {
    const dateStrRaw = format(value, formatStr);
    let dateStr =
      dateStrRaw.slice(0, HOUR_START_INDEX) + hour.toString().padStart(PAD_LENGTH, '0') + dateStrRaw.slice(HOUR_END_INDEX);
    dateStr =
      dateStr.slice(0, MINUTE_START_INDEX) + minute.toString().padStart(PAD_LENGTH, '0') + dateStr.slice(MINUTE_END_INDEX);
    dateStr =
      dateStr.slice(0, SECOND_START_INDEX) + second.toString().padStart(PAD_LENGTH, '0') + dateStr.slice(SECOND_END_INDEX);
    dateStr = dateStr.slice(0, AMPM_START_INDEX) + (ampm == AM_VALUE ? 'AM' : 'PM') + dateStr.slice(AMPM_END_INDEX);
    date = parse(dateStr, formatStr, value);
  } else {
    date = setHours(setMinutes(setSeconds(value, second), minute), hour);
  }
  return date;
}

export function getDateTimeFormat({
  dateFormat,
  hideTime,
  use12HourFormat,
}: {
  dateFormat?: string;
  hideTime?: boolean;
  use12HourFormat?: boolean;
}): string {
  if (dateFormat) return dateFormat;
  if (hideTime) return 'yyyy/MM/dd';

  return use12HourFormat ? 'yyyy/MM/dd hh:mm:ss a' : 'yyyy/MM/dd HH:mm:ss';
}
