import { DataGridColumnModel, EnumAlignment } from 'ngx-ui-hero';

import { Component, OnInit } from '@angular/core';

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
      data: 'name'
    },
    {
      caption: 'E-mail',
      data: 'email',
    },
    {
      caption: 'Status',
      data: 'active',
      captionAlignment: EnumAlignment.Center,
      dataAlignment: EnumAlignment.Center,
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
      dataAlignment: EnumAlignment.Center,
      data: 'active',
      sortable: false,
      render: (row, currentData, index) => {
        return currentData ? `<span class='badge badge-success'>Active</span>` : `<span class='badge badge-danger'>Inactive</span>`;
      }
    }
  ];

  dataGridBasicUsageExampleTemplate: string = `
<datagrid
  [data]="myBasicDatagridModel"
  [columns]="myBasicDatagridColumns"
  [allowExports]="true"
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
    <button class="btn btn-primary btn-sm mr-1"><i class="fa fa-edit"></i></button>
    <button class="btn btn-outline-danger btn-sm"><i class="fa fa-trash"></i></button>
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
        name: 'Very Very Very large Name for example Very Very Very large Name for example',
        email: 'myverylargeexampleofemail@domain.com',
        active: false
      },
      {
        name: 'Very Very Very large Name for example',
        email: 'myverylargeexampleofemail@domain.com',
        active: false
      },
      {
        name: 'Very Very Very large Name for example',
        email: 'myverylargeexampleofemail@domain.com',
        active: false
      },
      {
        name: 'Renato Silvado',
        email: 'myemail@domain.com',
        active: false
      },
    ];

    this.myBasicDatagridModel = model;
    this.myComplexDatagridModel = model;
  }

 

}
