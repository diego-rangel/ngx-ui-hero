import { BsModalRef } from 'ngx-bootstrap/modal';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Output() onClose = new EventEmitter();

  constructor(
    private modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  Fechar(): void {
    this.onClose.emit();
    this.modalRef.hide();
  }

}
