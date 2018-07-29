import { Type } from "@angular/compiler/src/core";

export class DataGridColumnModel {
    caption?: string = '';
    captionAlignment?: EnumAlignment = EnumAlignment.Left;
    captionClasses?: string = '';
    data?: string = '';
    dataAlignment?: EnumAlignment = EnumAlignment.Left;
    dataClasses?: string = '';
    dataType?: Type = String;
    width?: string;
    sortable?: boolean = true;
    sortDirection?: EnumSortDirection = EnumSortDirection.Ascending;
    sort?: DataGridSortingModel;
    render?(row: any, currentData: any, rowIndex: number): string;
}

export class DataGridSortingModel {
    sorting: boolean;
    sortDirection?: EnumSortDirection;
}

export enum EnumSortDirection {
    Ascending = 'asc',
    Descending = 'desc'
}

export enum EnumAlignment {
    Left = 0,
    Center = 1,
    Right = 2
}
