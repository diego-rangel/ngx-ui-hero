import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {
  transform(items: any[], property: string, searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return it[property].toLowerCase().includes(searchText);
    });
   }
}
