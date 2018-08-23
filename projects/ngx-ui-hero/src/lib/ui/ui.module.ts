import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { SpinnerComponent } from './components/spinner/spinner.component';
export { SpinnerComponent } from './components/spinner/spinner.component';

import { ModalComponent } from './components/modal/modal.component';
export { ModalComponent } from './components/modal/modal.component';

import { AlertService } from './services/alert.service';

export * from './services/alert.service';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  declarations: [
    SpinnerComponent,
    ModalComponent,
  ],
  exports: [
    SpinnerComponent,
    ModalComponent,
    PaginationModule,
    BsDropdownModule,
    ModalModule,
    BsDatepickerModule,
    ProgressbarModule,
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [
    AlertService
  ],  
})
export class UiModule { }
