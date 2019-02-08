import { BsModalRef } from 'ngx-bootstrap';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalTitle?: string = '';
  @Input() hideActions?: boolean = false;
  @Input() noPaddings?: boolean = false;
  @Input() cancelButtonLabel?: string = 'Cancel';

  constructor(
    private modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  Fechar(): void {
    this.modalRef.hide();
  }

}
