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
  
  inputEmailCode = `
<input-email
  [label]="'My E-mail'" 
  [placeholder]="'My placeholder...'" 
  [maxlength]="200" 
  [disabled]="false"   
  [showValidations]="true"
  [(ngModel)]="myEmailModel" 
  required>
</input-email>
  `;

  inputSelectCode = `
<input-select
  [label]="'My Label'" 
  [defaultOption]="'Select'" 
  [disabled]="false"   
  [showValidations]="true"
  [(ngModel)]="mySelectModel" 
  [options]="options"
  [displayTextProperty]="'text'"
  [valueProperty]="'value'"
  required>
  <!-- You can add your options as a template too -->
</input-select>
  `;

  inputSelectCode2 = `
<input-select
  [label]="'My Label 2'" 
  [defaultOption]="'Select'" 
  [disabled]="false"
  [(ngModel)]="mySelectModel">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</input-select>
  `;

  inputTextAreaCode = `
<input-textarea 
  [label]="'My Label'" 
  [placeholder]="'My placeholder...'" 
  [maxlength]="2000" 
  [disabled]="false"   
  [showValidations]="true"
  [(ngModel)]="myTextAreaModel" 
  required>
</input-textarea>
  `;

  myModel: string;
  myEmailModel: string;
  myTextAreaModel: string;
  mySelectModel: any = '';

  options = [
    { value: 1, text: 'Option 1' },
    { value: 2, text: 'Option 2' }
  ];

  constructor() {}

}
