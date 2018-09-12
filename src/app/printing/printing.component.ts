import { DataGridColumnModel, EnumAlignment } from 'ngx-ui-hero';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.scss']
})
export class PrintingComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

  

}
