import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import { DebounceDirective } from './directives/debounce.directive';
// export { DebounceDirective } from './directives/debounce.directive';

// import { CurrencySymbolPipe } from './base/currency-symbol.pipe';
// export { CurrencySymbolPipe } from './base/currency-symbol.pipe';

// import { AutoSelectOnFocusDirective } from './directives/auto-select-on-focus.directive';
// export { AutoSelectOnFocusDirective } from './directives/auto-select-on-focus.directive';

import { InputFormsConfig } from './input-forms-config';
export { InputFormsConfig } from './input-forms-config';
import { INPUT_FORMS_CONFIG } from './input-forms-config.constants';

import { InputTextComponent } from './components/input-text/input-text.component';
export { InputTextComponent } from './components/input-text/input-text.component';

import { InputValidationsComponent } from './components/input-validations/input-validations.component';
export { InputValidationsComponent } from './components/input-validations/input-validations.component';

import { InputSelectComponent } from './components/input-select/input-select.component';
export { InputSelectComponent } from './components/input-select/input-select.component';

import { InputEmailComponent } from './components/input-email/input-email.component';
export { InputEmailComponent } from './components/input-email/input-email.component';

import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
export { InputTextareaComponent } from './components/input-textarea/input-textarea.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    // AutoSelectOnFocusDirective,
    // DebounceDirective,
    // CurrencySymbolPipe,
    InputTextComponent,
    InputValidationsComponent,
    InputSelectComponent,
    InputEmailComponent,
    InputTextareaComponent,
  ],
  exports: [
    // AutoSelectOnFocusDirective,
    // DebounceDirective,
    // CurrencySymbolPipe,
    InputTextComponent,
    InputValidationsComponent,
    InputSelectComponent,
    InputEmailComponent,
    InputTextareaComponent,
  ],
})
export class InputFormsModule {
  static forRoot(config: InputFormsConfig): ModuleWithProviders {
    return {
      ngModule: InputFormsModule,
      providers: [
        {
          provide: INPUT_FORMS_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
