import * as m from 'moment-timezone';

export function isExpired(date: m.Moment): boolean {
  return date.diff(m(), 'minutes') > 5;
}

export function timeRemaining(date: m.Moment, unit: m.unitOfTime.Diff): number {
  return date.diff(m(), unit);
}

export function dateFormat(date: string | m.Moment, format: string): string {
  return m(date).format(format);
}

export function dateFormatNow(format: string): string {
  return m().format(format);
}

export function toDate(date: string | m.Moment): string {
  return m(date).format('YYYY-MM-DD');
}

export function convertFilterToWhere(fl: object): object {
  const where = { ...fl };
  for (const key in where) {
    if (where.hasOwnProperty(key)) {
      if (where[key] === undefined || where[key] === null) { delete where[key]; continue; }
      if (typeof where[key] === 'object') {
        if (isMoment(where[key])) {
          if (key === '$gte') {
            where[key].set({ hour: 0, minute: 0, second: 0 });
          } else if (key === '$lte') {
            where[key].set({ hour: 23, minute: 59, second: 59 });
          }
          continue;
        } else if (Array.isArray(where[key])) {
          continue;
        }
        where[key] = convertFilterToWhere(where[key]);
        if (Object.entries(where[key]).length === 0) { delete where[key]; }
      } else {
        if (key === '$gte') {
          where[key] = m(where[key]).set({ hour: 0, minute: 0, second: 0 });
        } else if (key === '$lte') {
          where[key] = m(where[key]).set({ hour: 23, minute: 59, second: 59 });
        }
      }
    }
  }
  return where;
}

export function sort(items: any[], column: string, dir: 1 | -1 = 1) {
  return [...items].sort((a, b) => {
    const res = a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
    return res * dir;
  });
}

export function uniqueArray(data: any[], uniquekey: string, returnKey?: string): any[] {
  const result = [];
  const map = new Map();
  for (const item of data) {
    if (!map.has(item[uniquekey])) {
      map.set(item[uniquekey], true);
      result.push(!!returnKey && item.hasOwnProperty(returnKey) ? item[returnKey] : item);
    }
  }
  return result;
}

export function getObjValue(obj: any, field: string): any {
  return field.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj);
}

export function isSunday(date?: m.Moment | string): boolean {
  return moment(date).day() === 0;
}

export function indexToChar(index: number) {
  return String.fromCharCode(65 + index);
}

export const moment = m;
export const isMoment = m.isMoment;
