import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';

import { CoreModule, UiModule, InputFormsModule, InputFormsConfig } from 'ngx-ui-hero';

import { ComponentsComponent } from './components.component';
import { ComponentsRoutingModule } from './components-routing.module';

export const inputFormsConfig: InputFormsConfig = {
  currency: {
    currencyCode: 'USD',
    align: 'right',
    allowNegative: true,
    allowZero: true,
    decimal: '.',
    thousands: ',',
    precision: 2,
    prefix: '',
    suffix: ''
  },
  validationMessages: {
    invalid: '{label} is invalid',
    required: '{label} is required',
    pattern: '{label} is invalid',
    maxlength: 'The filled-in value is greater than the maximum allowed',
    minlength: 'The filled-in value is less than the minimum allowed'
  }
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    HighlightModule.forRoot({ theme: 'github'}),
    InputFormsModule.forRoot(inputFormsConfig),
    ComponentsRoutingModule
  ],
  declarations: [ComponentsComponent],
})
export class ComponentsModule { }
