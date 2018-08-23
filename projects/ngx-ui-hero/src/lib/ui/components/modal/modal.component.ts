import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalTitle?: string = '';
  @Input() hideActions?: boolean = false;
  @Input() noPaddings?: boolean = false;

  constructor(
    private modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  Fechar(): void {
    this.modalRef.hide();
  }

}
