import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortPipe implements PipeTransform {
  transform(
    array: Array<any> | undefined | null,
    prop: string,
    order: string = 'alphabetical'
  ): Array<any> | undefined | null {
    return array && array.length ? sort() : array;
    function sort() {
      const
        // Supported orders: 'alphabetical' (by default), 'ascending', 'descending'
        ascendingSort: Function = (a: any, b: any) => a[prop] < b[prop],
        descendingSort: Function = (a: any, b: any) => a[prop] > b[prop],
        alphabeticalSort: Function = (a: any, b: any) => String(a[prop]).localeCompare(b[prop]),
        getSortFn: Function = (): Function | void => {
          switch (order) {
            case ('alphabetical'): return alphabeticalSort;
            case ('ascending'): return ascendingSort;
            case ('descending'): return descendingSort;
            default: return;
          }
        };
      return array.sort(getSortFn());
    }
  }
}
