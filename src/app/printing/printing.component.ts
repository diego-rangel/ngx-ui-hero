import { DataGridColumnModel, EnumAlignment, ReportComponent } from 'ngx-ui-hero';

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.scss']
})
export class PrintingComponent implements OnInit {
  @ViewChild('report', {static: true}) report: ReportComponent;

  now = new Date();
  data: Array<any> = [
    {
      name: 'Diego da Cunha Rangel',
      active: true
    },
    {
      name: 'Foo',
      active: true
    },
    {
      name: 'Baar',
      active: false
    },
    {
      name: 'Baar',
      active: false
    },     
    {
      name: 'Very Very Very large Name for example Very Very Very large Name for example',
      active: false
    },
    {
      name: 'Very Very Very large Name for example',
      active: false
    },
    {
      name: 'Very Very Very large Name for example',
      active: false
    },
    {
      name: 'Very Very Very large Name for example',
      active: false
    },
  ];
  columns: Array<DataGridColumnModel> = [
    {
      caption: 'Name',
      data: 'name',
    },
    {
      caption: 'Status',
      captionAlignment: EnumAlignment.Center,
      data: 'active',
      dataAlignment: EnumAlignment.Center,
      width: '100px',
      sortable: false
    }
  ];

  template = `
<ui-report #report reportTitle="My report example title">
  <div class="page-header">
    <h2>My report example</h2>
    <hr/>
  </div>
  <div class="report-body">
    <p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
    officia deserunt mollit anim id est laborum.</p>
    
    <p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
    officia deserunt mollit anim id est laborum.</p>

    <datagrid 
      [data]="data" 
      [columns]="columns" 
      [showInfos]="false"
      [itemsPerPage]="data.length"
      [initialColumnToSort]="0">
    </datagrid>

    <p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
    officia deserunt mollit anim id est laborum.</p>
    
    <p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
    officia deserunt mollit anim id est laborum.</p>
  </div>
  <div class="page-footer">
    <hr class="mb-1" />
    <div class="text-center">
      <small>{{now | date:'short'}}</small>
    </div>
  </div>
</ui-report>
  `;

  code = `
import { ReportComponent } from 'ngx-ui-hero';

...

@ViewChild('report') report: ReportComponent;

Print(): void {
  this.report.Print();
}

  `;

  constructor() { }

  ngOnInit() {
  }

}
