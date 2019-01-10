import { AlertService, DataGridColumnModel } from 'ngx-ui-hero';

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
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

  inputTextComMascaraCode = `
<input-text
  [label]="'My Label here'"
  [placeholder]="'My placeholder...'" 
  [maxlength]="200"
  [masking]="'(99) 0000-0000'"
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
  [showInputGroup]="true"
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

  checkboxCode = `
<input-checkbox
  [label]="'My checkbox Label'"
  [disabled]="false"
  [(ngModel)]="myCheckboxModel">
</input-checkbox>
  `;

  switchCode = `
<input-switch
  [label]="'My switch Label'"
  [disabled]="false"
  [(ngModel)]="mySwitchModel"
  (onChange)="onSwitchChanged($event)">
</input-switch>
  `;

  radioCode = `
<input-radio
  [label]="'My radio 1'"
  [disabled]="false"
  [name]="'radioOptions'"
  [radioValue]="1"
  [(ngModel)]="myRadioModel">
</input-radio>
<input-radio
    [label]="'My radio 2'"
    [disabled]="false"
    [name]="'radioOptions'"
    [radioValue]="2"
    [(ngModel)]="myRadioModel">
</input-radio>
  `;

  currencyCode = `
<input-currency
  [label]="'My Label'"
  [disabled]="false"
  [showValidations]="true"
  [showInputGroup]="true"
  [(ngModel)]="myCurrencyModel"
  required>
</input-currency>
  `;

  percentCode = `
<input-percent
  [label]="'My Label'"
  [disabled]="false"
  [showValidations]="true"
  [showInputGroup]="true"
  [(ngModel)]="myPercentModel"
  required>
</input-percent>
  `;

  numberCode = `
<input-number
  [label]="'My Label'"
  [disabled]="false"
  [maxValue]="100"
  [minValue]="0"
  [showValidations]="true"
  [(ngModel)]="myNumberModel"
  required>
</input-number>
  `;

  dateCode = `
<input-date
  [label]="'My Label'"
  [disabled]="false"
  [showValidations]="true"
  [(ngModel)]="myDateModel"
  required>
</input-date>
  `;

  uploadCode = `
<input-upload
  [label]="'My Upload'"
  [url]="'http://exemplo.com/api'"
  [autoUpload]="true"
  [allowedExtensions]="['jpg', 'png']"
  [maxFileSize]="4"
  [disabled]="false"
  [showDropZone]="true"
  (onError)="OnUploadError($event)">
</input-upload>
  `;

  uploadCodeChunked = `
<input-upload
  [label]="'My Upload chunked'"
  [url]="'http://exemplo.com/api'"
  [autoUpload]="false"
  [allowedExtensions]="['jpg', 'png']"
  [maxFileSize]="4"
  [disabled]="false"
  [chunk]="true"
  [showDropZone]="true"
  [showQueue]="true"
  (onError)="OnUploadError($event)">
</input-upload>
  `;

  myMultiselectCode = `
<input-multiselect 
  label="My Multiselect"
  [(ngModel)]="myMultiselectModel"
  [options]="multiSelectOptions" 
  displayTextProperty="text" 
  valueProperty="value">
</input-multiselect>
  `;

  myMonthYearCode = `
<input-month-year
  label="My Label"
  placeholder="Select..."
  format="MMM/yyyy"
  language="en"
  [disabled]="false"
  [showValidations]="true"
  [(ngModel)]="myDateMonthYearModel" 
  required>
</input-month-year>
  `;

  inputDropdownGridTemplate = `
<input-dropdown-grid
  label="My Dropdown Grid"
  displayTextProperty="name"
  valueProperty="id"
  [(ngModel)]="myDropdownGridModel"
  [disabled]="false"
  [columns]="dropdownGridColumns"
  [data]="dropdownGridData"
  required>
</input-dropdown-grid>
  `;

  inputDropdownGridCode = `
import { DataGridColumnModel } from 'ngx-ui-hero';

dropdownGridData = [
  { id: 1, name: 'Person 1', email: 'person1@domain.com' },
  { id: 2, name: 'Person 2', email: 'person2@domain.com' },
  { id: 3, name: 'Person 3', email: 'person3@domain.com' },
];

dropdownGridColumns: Array<DataGridColumnModel> = [
  {
    caption: 'Name',
    data: 'name',
  },
  {
    caption: 'E-mail',
    data: 'email'
  }
];
  `;

  myModel: string;
  myModelComMascara: string;
  myEmailModel: string;
  myTextAreaModel: string;
  mySelectModel: any;
  myMultiselectModel: any[] = [];
  myCheckboxModel: boolean;
  mySwitchModel: boolean;
  myRadioModel: any;
  myCurrencyModel: any;
  myPercentModel: any;
  myNumberModel: any;
  myDateModel: Date;
  myDropdownGridModel: any;
  myDateMonthYearModel: Date;

  dropdownGridData = [
    { id: 1, name: 'Person 1', email: 'person1@domain.com' },
    { id: 2, name: 'Person 2', email: 'person2@domain.com' },
    { id: 3, name: 'Person 3', email: 'person3@domain.com' },
  ];
  dropdownGridColumns: Array<DataGridColumnModel> = [
    {
      caption: 'Name',
      data: 'name',
    },
    {
      caption: 'E-mail',
      data: 'email'
    }
  ];

  options = [
    { value: 1, text: 'Option 1' },
    { value: 2, text: 'Option 2' }
  ];
  multiSelectOptions = [
    { value: 1, text: 'Option 1' },
    { value: 2, text: 'Option 2' },
    { value: 3, text: 'Option 3' },
    { value: 4, text: 'Option 4' },
    { value: 5, text: 'Option 5' }
  ];

  constructor(
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.myDateModel = new Date();
    this.myDateMonthYearModel = new Date();

    setTimeout(()=> {
      $('body').scrollspy({ 
        target: '#components-menu',
        offset: 40
      });
    });
  }

  OnUploadError(event: any): void {
    this.alert.error('Oops =(', "It's only a test and does not have a test backend.");
  }
 
}
