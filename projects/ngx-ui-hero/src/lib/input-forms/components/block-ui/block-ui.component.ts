import { Component, Input } from '@angular/core';

@Component({
  selector: '[block-ui]',
  templateUrl: './block-ui.component.html',
  styleUrls: ['./block-ui.component.scss']
})
export class BlockUiComponent {
  @Input('block-ui') public loading: boolean;
  @Input('block-ui-message') public message: string;

  constructor() {}

}
