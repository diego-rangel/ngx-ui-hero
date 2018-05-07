import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightModule } from 'ngx-highlightjs';

import { GettingStartedComponent } from './getting-started.component';
import { GettingStartedRoutingModule } from './getting-started-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HighlightModule.forRoot({ theme: 'github'}),
    GettingStartedRoutingModule
  ],
  declarations: [GettingStartedComponent],
})
export class GettingStartedModule { }
