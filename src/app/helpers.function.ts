import * as m from 'moment-timezone';

export const USER_ROLES = {
  DEALER_ADMIN: 3,
  DIVISION_MANAGER: 6,
  REGION_MANAGER: 7,
  OFFICE_MANAGER: 4,
  SALES_REP: 5,
}

export function getDateId(date: string): number {
  return +m(date).utc().format('YYYYMMDD');
}

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

export function getRoleLevel(role: number): number {
  switch (role) {
    case USER_ROLES.DEALER_ADMIN: return 1;
    case USER_ROLES.DIVISION_MANAGER: return 2;
    case USER_ROLES.REGION_MANAGER: return 3;
    case USER_ROLES.OFFICE_MANAGER: return 4;
    case USER_ROLES.SALES_REP: return 5;
    default: return 5;
  }
}

export const moment = m;
export const isMoment = m.isMoment;
