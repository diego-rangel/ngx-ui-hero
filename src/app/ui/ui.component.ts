import { BsModalService } from 'ngx-bootstrap/modal';
import { BlockUi } from 'ngx-ui-hero';

import { Component, OnInit } from '@angular/core';

import { ModalExampleComponent } from './modal-example/modal-example.component';

declare var $: any;

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {
  blockUi = new BlockUi();

  buttonsCode = `
<ui-radial-button iconClass="fa fa-times" backgroundColorClass="btn-outline-secondary" label="Cancel" (onClick)="MyButtonClicked()"></ui-radial-button>
<ui-radial-button iconClass="fa fa-plus" backgroundColorClass="btn-primary" label="Add" (onClick)="MyButtonClicked()"></ui-radial-button>
<ui-radial-button iconClass="fa fa-save" backgroundColorClass="btn-success" label="Save" (onClick)="MyButtonClicked()"></ui-radial-button>
<ui-radial-button iconClass="fa fa-trash" backgroundColorClass="btn-danger" label="Delete" (onClick)="MyButtonClicked()"></ui-radial-button>
  `;

  blockUiTemplate = `
<div [block-ui]="blockUi">
  ...
</div>
  `;

  blockUiCode = `
import { BlockUi } from 'ngx-ui-hero';

export class MyComponent {
  blockUi = new BlockUi();

  constructor() {
    this.blockUi.start('Some optional loading message');
    this.blockUi.stop();
  }
}
  `;

  modalTemplate = `
<ui-modal modalTitle="My example modal">
  <div class="body">
    <p>My body elements...</p>
  </div>
  <div class="actions">
    <button class="btn btn-primary"><i class="fa fa-magic"></i> Another action</button>
  </div>
</ui-modal>
  `;

  modalCode = `
import { BsModalService } from 'ngx-bootstrap/modal';

export class MyComponent {  
  constructor(private modalService: BsModalService) {}

  showMyModalExample() {
    this.modalService.show(MyModalExampleComponent, {
      class: 'modal-lg'
    });
  }
}
  `;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    setTimeout(()=> {
      $('body').scrollspy({ 
        target: '#components-menu',
        offset: 40
      });
    });
  }

  showModalExample() {
    this.modalService.show(ModalExampleComponent, {
      class: 'modal-lg'
    });
  }

}
