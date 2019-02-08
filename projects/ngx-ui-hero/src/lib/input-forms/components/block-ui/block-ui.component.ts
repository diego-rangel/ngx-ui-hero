import { Component, Input } from '@angular/core';

import { BlockUi } from '../../classes/block-ui';

@Component({
  selector: '[block-ui]',
  templateUrl: './block-ui.component.html',
  styleUrls: ['./block-ui.component.scss']
})
export class BlockUiComponent {
  @Input('block-ui') public blockUi: BlockUi;

  constructor() {}

}
