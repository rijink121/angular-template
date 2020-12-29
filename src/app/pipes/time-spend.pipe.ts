import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSpend'
})
export class TimeSpendPipe implements PipeTransform {

  transform(seconds: number): string {
    if (!seconds && seconds !== 0) { return ''; }

    const formats = [
      { max: 60, unit: 'Second', sec: 1 },
      { max: 3600, unit: 'Minute', sec: 60 },
      { max: 86400, unit: 'Hour', sec: 3600 },
      { max: 2419200, unit: 'Day', sec: 86400 },
      /* { max: 2419200, unit: 'Week', sec: 604800 }, */
      { max: 29030400, unit: 'Month', sec: 2419200 },
      { max: 2903040000, unit: 'Year', sec: 29030400 },
    ];

    for (const format of formats) {
      if (seconds < format.max) {
        const val = Math.floor(seconds / format.sec);
        return val + ' ' + format.unit + (val > 1 ? 's' : '');
      }
    }
  }
}
