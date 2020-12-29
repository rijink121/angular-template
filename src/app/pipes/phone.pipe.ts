import { Pipe, PipeTransform } from '@angular/core';
import { MaskPipe } from 'ngx-mask';

@Pipe({
  name: 'phone'
})
export class PhonePipe extends MaskPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, '(000) 000-0000');
  }

}
