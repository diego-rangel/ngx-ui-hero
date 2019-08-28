import { GanttItemModel } from 'ngx-ui-hero';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {
  data: Array<GanttItemModel> = [  
    {
      label: 'Diego Rangel',
      series: [
        { startDate: new Date(2019, 3, 1, 0, 0, 0), endDate: new Date(2019, 3, 20, 0, 0, 0) },
        { startDate: new Date(2019, 6, 20, 0, 0, 0), endDate: new Date(2019, 7, 3, 0, 0, 0) },
      ]
    },
    {
      label: 'Foo',
      series: [
        { color: '#3F51B5', startDate: new Date(2019, 1, 1, 0, 0, 0), endDate: new Date(2019, 2, 2, 0, 0, 0) },
      ]
    },   
    {
      label: 'Bar',
      series: [
        { startDate: new Date(2019, 5, 10, 0, 0, 0), endDate: new Date(2019, 5, 29, 0, 0, 0) },
        { startDate: new Date(2019, 10, 10, 0, 0, 0), endDate: new Date(2019, 10, 24, 0, 0, 0) },
      ]
    },   
  ];

  template: string = `
<gantt-chart [data]="data" caption="My Caption title" [maxHeight]="400" (onSelect)="onSelect($event)"></gantt-chart>
  `;
  code: string = `
import { GanttItemModel } from 'ngx-ui-hero';
...

data: Array<GanttItemModel> = [  
  {
    label: 'Diego Rangel',
    series: [
      { startDate: new Date(2019, 3, 1, 0, 0, 0), endDate: new Date(2019, 3, 20, 0, 0, 0) },
      { startDate: new Date(2019, 6, 20, 0, 0, 0), endDate: new Date(2019, 7, 3, 0, 0, 0) },
    ]
  },
  {
    label: 'Foo',
    series: [
      { color: '#3F51B5', startDate: new Date(2019, 1, 1, 0, 0, 0), endDate: new Date(2019, 2, 2, 0, 0, 0) },
    ]
  },   
  {
    label: 'Bar',
    series: [
      { startDate: new Date(2019, 5, 10, 0, 0, 0), endDate: new Date(2019, 5, 29, 0, 0, 0) },
      { startDate: new Date(2019, 10, 10, 0, 0, 0), endDate: new Date(2019, 10, 24, 0, 0, 0) },
    ]
  },   
];

onSelect(event: any) {
  console.log(event);
}
  `;

  constructor() { }

  ngOnInit() {
  }

  onSelect(event: any) {
    console.log(event);
  }

}
