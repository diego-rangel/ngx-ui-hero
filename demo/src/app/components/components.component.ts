import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-ui-hero';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent {
  inputTextCode = `
<input-text 
  [label]="'My Label here'" 
  [placeholder]="'My placeholder...'" 
  [maxlength]="200" 
  [disabled]="false"   
  [showValidations]="true"
  [(ngModel)]="myModel" 
  required>
</input-text>
  `;

  myModel: any;

  constructor() {}

}
