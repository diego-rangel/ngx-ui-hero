export interface DataGridConfig {
    emptyResultsMessage?: string;
    infoMessage?: string;
    actionsColumnCaption?: string;
    showInfos?: boolean;
    allowColumnResize?: boolean; 
    mode?: EnumDataGridMode;
    paging?: DataGridPagingConfig;
    styles?: DataGridStylesConfig;
    autoFitMode?: EnumAutoFitMode;
    exporting?: DataGridExportingConfig;
    filtering?: DataGridFilteringConfig;
    reordering?: DataGridReorderingConfig;   
}

export interface DataGridPagingConfig {
    firstText?: string;
    previousText?: string;
    nextText?: string;
    lastText?: string;

    /**
     * maximum number of items per page. If value less than 1 will display all items on one page
     */
    itemsPerPage?: number;

    /**
     * if false first and last buttons will be hidden
     */
    boundaryLinks?: boolean;

    /**
     * if false previous and next buttons will be hidden
     */
    directionLinks?: boolean;

    /**
     * if true current page will in the middle of pages list
     */
    rotate?: boolean;

    /**
     * limit number for page links in pager
     */
    maxSize?: number;
}

export interface DataGridStylesConfig {
    striped?: boolean;
    bordered?: boolean;
    hoverEffect?: boolean;
    responsive?: boolean;
    animated?: boolean;
}

export interface DataGridExportingConfig {
    allowExports?: boolean;
    exportButtonLabel?: string;
    exportedFileName?: string;
    exportedExcelSheetName?: string;
}

export interface DataGridFilteringConfig {
    allowColumnFilters?: boolean;
    filterPlaceholder?: string;
    filterPlacement?: string;
}

export interface DataGridReorderingConfig {
    allowColumnReorder?: boolean;
}

export enum EnumDataGridMode {
    OnClient,
    OnServer
}

export enum EnumAutoFitMode {
    Default,
    ByCaption,
    ByContent
}
