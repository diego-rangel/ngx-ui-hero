export interface GanttItemModel {
    label: string;
    series: Array<GanttSerieModel>;
}

export interface GanttSerieModel {
    color?: string;
    startDate: Date;
    endDate: Date;
}

export interface GanttInternalItemModel {
    label: string;
    series: Array<GanttInternalSerieModel>;
}

export interface GanttInternalSerieModel {
    color?: string;
    startDate: Date;
    endDate: Date;
    left: number;
    width: number;
    daysDiff: number;
}