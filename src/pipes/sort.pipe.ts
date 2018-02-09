import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortPipe implements PipeTransform {

  transform(array: Array<any>, prop: string, key: string): Array<any> {
    const toLowerCase = str => String(str).toLowerCase();
    if (array && array.length) {
      let sortFn;
      switch (key) {
        case ('ascending'): sortFn = (a: any, b: any) => a[prop] < b[prop] ? -1 : 1; break;
        case ('descending'): sortFn = (a: any, b: any) => a[prop] > b[prop] ? -1 : 1; break;
        case ('alphabetical'): sortFn = (a: any, b: any) => toLowerCase(a[prop]) < toLowerCase(b[prop]) ? -1 : 1; break;
        default: break;
      }
      return array.sort(sortFn);
    }
  }

}
