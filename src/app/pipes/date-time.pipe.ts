import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'environments/environment';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, environment.DATE_TIME_FORMAT);
  }

}
