import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-validations',
  templateUrl: './input-validations.component.html',
  styleUrls: ['./input-validations.component.scss']
})
export class InputValidationsComponent {

  @Input() messages: Array<string>;

}
