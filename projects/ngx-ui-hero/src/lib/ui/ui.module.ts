import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalComponent } from './components/modal/modal.component';
import { ReportComponent } from './components/report/report.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { AutoSelectOnFocusDirective } from './directives/auto-select-on-focus.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { DebounceDirective } from './directives/debounce.directive';
import { TutorialDirective } from './directives/tutorial.directive';
import { SearchByPipe } from './pipes/search-by.pipe';
import { AlertService } from './services/alert.service';
import { TutorialService } from './services/tutorial.service';

export { SearchByPipe } from './pipes/search-by.pipe';
export { ClickOutsideDirective } from './directives/click-outside.directive';
export { AutoFocusDirective } from './directives/auto-focus.directive';
export { SpinnerComponent } from './components/spinner/spinner.component';
export { ModalComponent } from './components/modal/modal.component';
export { ReportComponent } from './components/report/report.component';
export { TutorialDirective } from './directives/tutorial.directive';
export { TutorialService } from './services/tutorial.service';
export { TutorialAction } from './classes/tutorial-action';
export { AutoSelectOnFocusDirective } from './directives/auto-select-on-focus.directive';
export { DebounceDirective } from './directives/debounce.directive';

export * from './services/alert.service';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
  ],
  declarations: [
    AutoSelectOnFocusDirective,
    DebounceDirective,
    ClickOutsideDirective,
    AutoFocusDirective,
    TutorialDirective,
    SearchByPipe,
    SpinnerComponent,
    ModalComponent,
    ReportComponent,
  ],
  exports: [
    AutoSelectOnFocusDirective,
    DebounceDirective,
    ClickOutsideDirective,
    AutoFocusDirective,
    TutorialDirective,
    SearchByPipe,
    SpinnerComponent,
    ModalComponent,
    ReportComponent,
    PaginationModule,
    BsDropdownModule,
    ModalModule,
    BsDatepickerModule,
    ProgressbarModule,
    TooltipModule,
    PopoverModule,
    TabsModule
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [
    AlertService,
    TutorialService
  ],  
})
export class UiModule { }
