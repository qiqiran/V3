/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import moment from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD ';

export function formatToDateTime(date: moment.MomentInput = null, format = DATE_TIME_FORMAT): string {
  return moment(date).format(format);
}

export function formatToDate(date: moment.MomentInput = null, format = DATE_FORMAT): string {
  return moment(date).format(format);
}

export function lastDay(num = 1, date: Date = new Date()) {
  date.setTime(date.getTime() - 3600 * 1000 * 24 * num);
  return date;
}

export const dateUtil = moment;
