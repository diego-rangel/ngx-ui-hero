import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalComponent } from './components/modal/modal.component';
import { ReportComponent } from './components/report/report.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SearchByPipe } from './pipes/search-by.pipe';
import { AlertService } from './services/alert.service';

export { SearchByPipe } from './pipes/search-by.pipe';
export { ClickOutsideDirective } from './directives/click-outside.directive';
export { SpinnerComponent } from './components/spinner/spinner.component';
export { ModalComponent } from './components/modal/modal.component';
export { ReportComponent } from './components/report/report.component';

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
  ],
  declarations: [
    ClickOutsideDirective,
    SearchByPipe,
    SpinnerComponent,
    ModalComponent,
    ReportComponent,
  ],
  exports: [
    ClickOutsideDirective,
    SearchByPipe,
    SpinnerComponent,
    ModalComponent,
    ReportComponent,
    PaginationModule,
    BsDropdownModule,
    ModalModule,
    BsDatepickerModule,
    ProgressbarModule,
    TooltipModule
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [
    AlertService
  ],  
})
export class UiModule { }
