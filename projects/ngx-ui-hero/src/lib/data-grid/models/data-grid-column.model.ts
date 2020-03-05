import { ColumnFilterModel } from './column-filter.model';

export class DataGridColumnModel {
    caption?: string = '';
    captionAlignment?: EnumAlignment = EnumAlignment.Left;
    captionClasses?: string = '';
    data?: string = '';
    dataAlignment?: EnumAlignment = EnumAlignment.Left;
    dataClasses?: string = '';
    width?: string;
    sortable?: boolean = true;
    sortDirection?: EnumSortDirection = EnumSortDirection.Ascending;
    sort?: DataGridSortingModel;
    enableTooltip?: boolean = false;
    isFiltersOpenned?: boolean = false;
    filterable?: boolean = true;
    index?: number;
    visible?: boolean = false;
    renderCaption?(): string;
    render?(row: any, currentData: any, rowIndex: number): string;
    renderOnPrint?(row: any, currentData: any, rowIndex: number): string;
    onClick?(row: any, currentData: any, rowIndex: number, column: DataGridColumnModel): void;

    /**
     * If true, a summary value will be displayed in a bottom summaries row, into the proper column.
     * @var name It must be a numeric property.
     */
    summarizable?: boolean = false;
    summaryPrefix?: string = '';

    simpleFilter?: ColumnFilterModel;
    customFilters?: ColumnFilterModel[];
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
