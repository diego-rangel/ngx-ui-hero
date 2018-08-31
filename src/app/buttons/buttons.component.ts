import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  buttonsCode = `
<ui-radial-button iconClass="fa fa-times" backgroundColorClass="btn-outline-secondary" label="Cancel" (onClick)="MyButtonClicked()"></ui-radial-button>
<ui-radial-button iconClass="fa fa-plus" backgroundColorClass="btn-primary" label="Add" (onClick)="MyButtonClicked()"></ui-radial-button>
<ui-radial-button iconClass="fa fa-save" backgroundColorClass="btn-success" label="Save" (onClick)="MyButtonClicked()"></ui-radial-button>
<ui-radial-button iconClass="fa fa-trash" backgroundColorClass="btn-danger" label="Delete" (onClick)="MyButtonClicked()"></ui-radial-button>
  `;

  constructor() { }

  ngOnInit() {
  }

  MyButtonClicked() {
    console.log('click');
  }

}
