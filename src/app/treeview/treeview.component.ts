import { EnumAlignment, EnumTreeViewColumnDataType, TreeViewColumnModel } from 'ngx-ui-hero';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss']
})
export class TreeviewComponent implements OnInit {
  data: Array<any> = [
    {
      name: '000.000.100.001',
      amount: 109877,
      children: [
        {
          name: '000.000.100.001.001',
          amount: 879546
        },
        {
          name: '000.000.100.001.003',
          amount: 56465,
          children: [
            {
              name: '000.000.100.001.0031',
              amount: 879546
            },
            {
              name: '000.000.100.001.0032',
              amount: 879546,
            },
            {
              name: '000.000.100.001.0033',
              amount: 879546
            },
          ]
        },
      ]
    },
    {
      name: '000.000.100.002',
      amount: 9873613
    },
  ];
  columns: Array<TreeViewColumnModel> = [
    {
      caption: 'Amount',
      data: 'amount',
      width: '200px',
      editable: true,
      dataAlignment: EnumAlignment.Right,
      captionAlignment: EnumAlignment.Center,
      dataType: EnumTreeViewColumnDataType.Currency
    },
  ];

  treeViewBasicUsageExampleTemplate = `
<ui-tree-view
  [data]="data"
  labelProperty="name"
  collectionProperty="children">
</ui-tree-view>
  `;
  treeViewComplexUsageExampleTemplate = `
<ui-tree-view
  [data]="data"
  [columns]="columns"
  labelProperty="name"
  collectionProperty="children">
</ui-tree-view>
  `;
  treeViewBasicUsageExampleDataCode = `
data: Array<any> = [
  {
    name: '000.000.100.001',
    amount: 109877,
    children: [
      {
        name: '000.000.100.001.001',
        amount: 879546
      },
      {
        name: '000.000.100.001.003',
        amount: 56465,
        children: [
          {
            name: '000.000.100.001.0031',
            amount: 879546
          },
          {
            name: '000.000.100.001.0032',
            amount: 879546,
          },
          {
            name: '000.000.100.001.0033',
            amount: 879546
          },
        ]
      },
    ]
  },
  {
    name: '000.000.100.002',
    amount: 9873613
  },
];
  `;
  treeViewComplexUsageExampleDataCode = `
columns: Array<TreeViewColumnModel> = [
  {
    caption: 'Amount',
    data: 'amount',
    width: '200px',
    editable: true,
    dataAlignment: EnumAlignment.Right,
    captionAlignment: EnumAlignment.Center,
    dataType: EnumTreeViewColumnDataType.Currency
  }
];

data: Array<any> = [
  {
    name: '000.000.100.001',
    amount: 109877,
    children: [
      {
        name: '000.000.100.001.001',
        amount: 879546
      },
      {
        name: '000.000.100.001.003',
        amount: 56465,
        children: [
          {
            name: '000.000.100.001.0031',
            amount: 879546
          },
          {
            name: '000.000.100.001.0032',
            amount: 879546,
          },
          {
            name: '000.000.100.001.0033',
            amount: 879546
          },
        ]
      },
    ]
  },
  {
    name: '000.000.100.002',
    amount: 9873613
  },
];
  `;

  constructor() { }

  ngOnInit() {
  }

}
