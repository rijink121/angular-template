import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chipsFilter',
  pure: false
})
export class ChipsFilterPipe implements PipeTransform {

  transform(list: string[], selected: string[] = [], search: string = ''): string[] {
    if (selected.indexOf('Any') > -1) return [];
    return list.filter(x => selected.indexOf(x) === -1).filter(x => !search || x.toLowerCase().indexOf(search) === 0);
  }

}
