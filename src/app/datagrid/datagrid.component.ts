import { Component, OnInit } from '@angular/core';
import { DataGridColumnModel, EnumAlignment } from 'ngx-ui-hero';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss']
})
export class DatagridComponent implements OnInit {
  myBasicDatagridModel: Array<any>;
  myBasicDatagridColumns: Array<DataGridColumnModel> = [
    {
      caption: 'Name',
      data: 'name',
    },
    {
      caption: 'E-mail',
      data: 'email'
    },
    {
      caption: 'Status',
      captionAlignment: EnumAlignment.Center,
      data: 'active',
      dataAlignment: EnumAlignment.Center,
      width: '200px',
      sortable: false
    }
  ];

  myComplexDatagridModel: Array<any>;
  myComplexDatagridColumns: Array<DataGridColumnModel> = [
    {
      caption: 'Name',
      data: 'name',
    },
    {
      caption: 'E-mail',
      data: 'email'
    },
    {
      caption: 'Status',
      captionAlignment: EnumAlignment.Center,
      data: 'active',
      render: (row, currentData, index) => {
        return currentData ? `<span class='badge badge-success'>Ativo</span>` : `<span class='badge badge-danger'>Inativo</span>`;
      },
      dataAlignment: EnumAlignment.Center,
      width: '200px',
      sortable: false
    }
  ];

  dataGridBasicUsageExampleTemplate: string = `
<datagrid 
  [data]="myBasicDatagridModel" 
  [columns]="myBasicDatagridColumns" 
  [initialColumnToSort]="0">
</datagrid>
  `;

  dataGridBasicUsageExampleCode: string = `  
import { DataGridColumnModel, EnumAlignment } from 'ngx-ui-hero';

myBasicDatagridModel: Array<any>;

myBasicDatagridColumns: Array<DataGridColumnModel> = [
  {
    caption: 'Name',
    data: 'name',
  },
  {
    caption: 'E-mail',
    data: 'email'
  },
  {
    caption: 'Status',
    captionAlignment: EnumAlignment.Center,
    data: 'active',
    dataAlignment: EnumAlignment.Center,
    width: '200px',
    sortable: false
  }
];
  `;

  dataGridComplexUsageExampleTemplate: string = `
<datagrid 
  [data]="myComplexDatagridModel" 
  [columns]="myComplexDatagridColumns" 
  [showActionsColumn]="true"
  [initialColumnToSort]="0">

  <ng-template actions-column let-row="row" let-rowIndex="rowIndex">
    <button class="btn btn-primary btn-sm mr-1"><fa name="edit"></fa></button>
    <button class="btn btn-outline-danger btn-sm"><fa name="trash"></fa></button>
  </ng-template>
</datagrid>
  `;

  dataGridComplexUsageExampleCode: string = `
import { DataGridColumnModel, EnumAlignment } from 'ngx-ui-hero';

myComplexDatagridModel: Array<any>;

myComplexDatagridColumns: Array<DataGridColumnModel> = [
  {
    caption: 'Name',
    data: 'name',
  },
  {
    caption: 'E-mail',
    data: 'email'
  },
  {
    caption: 'Status',
    captionAlignment: EnumAlignment.Center,
    data: 'active',
    render: (row, currentData, index) => {
      return currentData ? "<span class='badge badge-success'>Ativo</span>" : "<span class='badge badge-danger'>Inativo</span>";
    },
    dataAlignment: EnumAlignment.Center,
    width: '200px',
    sortable: false
  }
];
  `;

  constructor() { }

  ngOnInit() {
    let model = [
      {
        name: 'Diego da Cunha Rangel',
        email: 'my-email@domain.com',
        active: true
      },
      {
        name: 'Foo',
        email: 'my-email@domain.com',
        active: true
      },
      {
        name: 'Baar',
        email: 'my-email@domain.com',
        active: false
      },
      {
        name: 'Baar',
        email: 'my-email@domain.com',
        active: false
      },
      {
        name: 'Baar',
        email: 'my-email@domain.com',
        active: false
      },
    ];
    
    this.myBasicDatagridModel = model;
    this.myComplexDatagridModel = model;
  }

}
