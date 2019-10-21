import * as momentImported from 'moment';

import { Component, ContentChild, EventEmitter, Inject, Input, OnInit, Optional, Output, TemplateRef } from '@angular/core';

import { ChartsConfig } from '../../config/charts-config';
import { CHARTS_CONFIG } from '../../config/charts-config.contants';
import { GanttSeriesTooltipTemplateDirective } from '../../directives/gantt-templates.directive';
import { GanttInternalItemModel, GanttInternalSerieModel, GanttItemModel, GanttSerieModel } from './models/gantt-item.model';

declare var $: any;
const moment = momentImported;

let identifier = 0;

@Component({
  selector: 'gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class GanttChartComponent implements OnInit {
  @Input('data') externalData: Array<GanttItemModel>;
  @Input() caption: string;
  @Input() tooltipPlacement: string = 'left';
  @Input() maxHeight: number = 0;
  @Input() showFooter: boolean = false;
  @Input() currentYear: number;
  @Output() onSelect = new EventEmitter<any>();
  @ContentChild(GanttSeriesTooltipTemplateDirective, {read: TemplateRef, static: true}) seriesTooltipTemplate: GanttSeriesTooltipTemplateDirective;

  public identifier = `gantt-chart-${identifier++}`;  
  
  locale?: string = 'en-us';
  emptyMessage?: string = 'No results found at this moment.';
  internalData: Array<GanttInternalItemModel>;
  months: Array<string>;
  dayLabel: string;
  monthLabel: string;
  yearLabel: string;  
  currentMonth: number;
  showingMouseIndicator: boolean = false;
  mouseMovingLastMonth: boolean = false;
  mouseIndicatorCoordinateX: number;
  dateIndicator: Date;
  colors: Array<string> = [
    '#8270fa', 
    '#4d5b66', 
    '#4fd1a1', 
    '#fe3cae', 
    '#ffca22', 
    '#ff9f41', 
    '#5aaaff', 
    '#498acb', 
    '#27cfc2', 
    '#ff6982', 
    '#f44336', 
    '#cddc39', 
    '#607d8b', 
    '#795548'];

  constructor(
    @Inject(CHARTS_CONFIG) @Optional() config: ChartsConfig,
  ) {
    Object.assign(this, config);
  }

  ngOnInit() {
    this.initData();
    this.initMonths();
    this.initTimelineSizes();
  }

  onResize(){
    this.handleTimelineSizes();
  }
  onSerieSelected(item: GanttInternalItemModel, serie: GanttInternalSerieModel): void {
    this.onSelect.emit({
      item,
      serie
    });
  }
  onTimelineMouseMove(event: MouseEvent): void {
    if (!this.showingMouseIndicator) return;

    let offset = $(`#${this.identifier} .gantt-timeline .timeline`).offset();
    this.mouseIndicatorCoordinateX = event.pageX - offset.left;

    let monthWidth: number = $(`#${this.identifier} .gantt-timeline .timeline .item:first-child`).children('.box:first-child').width();
    let monthIndexBeingHovered: number = Math.floor(this.mouseIndicatorCoordinateX / (monthWidth + 2));

    let date = new Date(this.currentYear, monthIndexBeingHovered, 1);
    let daysInMonth: number = moment(date).daysInMonth();
    let dayWidth: number = monthWidth / daysInMonth;
    let dayBeignHovered: number = Math.floor((this.mouseIndicatorCoordinateX - ((monthWidth + 2) * monthIndexBeingHovered)) / dayWidth) + 1;

    if (dayBeignHovered <= 0 || dayBeignHovered > daysInMonth) return;
    
    this.dateIndicator = new Date(this.currentYear, monthIndexBeingHovered, dayBeignHovered);
    this.mouseMovingLastMonth = monthIndexBeingHovered == 11;
  }
  onTimelineMouseEnter(): void {
    this.showingMouseIndicator = true;
  }
  onTimelineMouseLeave(): void {
    this.showingMouseIndicator = false;
  }

  private initData(): void {
    if (!this.externalData || this.externalData.length == 0) return;
    this.internalData = new Array<GanttInternalItemModel>();

    for (let i = 0; i < this.externalData.length; i++) {
      let colorIndex = Math.round(Math.random() * (this.colors.length - 1));

      this.internalData.push({
        label: this.externalData[i].label,
        series: this.externalData[i].series.map(s => {
          return {
            color: s.color || this.colors[colorIndex],
            startDate: s.startDate,
            endDate: s.endDate,
            data: s.data,
            left: 0,
            width: 0,
            daysDiff: this.daysDiffFromSerie(s),
            label: s.label
          };
        })
      });
    }
  }
  private daysDiffFromSerie(serie: GanttSerieModel): number {
    var start = moment(serie.startDate);
    var end = moment(serie.endDate);

    return end.diff(start, 'days') + 1;
  }
  private monthsDiffFromSerie(serie: GanttSerieModel): number {
    var start = moment(serie.startDate);
    var end = moment(serie.endDate);

    return end.diff(start, 'months');
  }
  private initMonths(): void {
    moment.locale(this.locale);

    let today = new Date();

    if (!this.currentYear) {
      this.currentYear = today.getFullYear();
    }

    let referenceDate = new Date(this.currentYear, today.getMonth(), today.getDay());
    
    this.dayLabel = moment.localeData().relativeTime(1, false, 'd', false).split(' ')[1];
    this.monthLabel = moment.localeData().relativeTime(1, false, 'M', false).split(' ')[1];
    this.yearLabel = moment.localeData().relativeTime(1, false, 'y', false).split(' ')[1];    
    this.currentMonth = referenceDate.getMonth();

    this.months = moment.monthsShort('-MMM-');
  }
  private initTimelineSizes(): void {
    setTimeout(() => {
      this.handleTimelineSizes();
    }, 0);
  }
  private handleTimelineSizes(): void {
    if (!this.internalData || this.internalData.length == 0) return;
    
    let monthWidth: number = $(`#${this.identifier} .gantt-timeline .timeline .item:first-child`).children('.box:first-child').width();
    
    for (let i = 0; i < this.internalData.length; i++) {
      if (!this.internalData[i].series || this.internalData[i].series.length == 0) continue;

      for (let s = 0; s < this.internalData[i].series.length; s++) {
        let serieTotalWidth = 0;
        let day = this.internalData[i].series[s].startDate.getDate();
        let month = this.internalData[i].series[s].startDate.getMonth() + 1;
        let daysDiff = this.internalData[i].series[s].daysDiff;
        let startDate = this.internalData[i].series[s].startDate;
        let firstDayWidth: number = monthWidth / moment(startDate).daysInMonth();
        let monthsDiff = this.monthsDiffFromSerie(this.internalData[i].series[s]);

        for (let d = 0; d < daysDiff; d++) {
          let date = moment(startDate).add({days: d}).toDate();
          let daysInMonth = moment(date).daysInMonth();
          let dayWidth: number = monthWidth / daysInMonth;

          serieTotalWidth += dayWidth;
        }

        this.internalData[i].series[s].left = ((month - 1) * monthWidth) + ((day - 1) * firstDayWidth) + ((month - 1) * 2);
        this.internalData[i].series[s].width = serieTotalWidth + (monthsDiff * 2);
      }
    }
  }

}
