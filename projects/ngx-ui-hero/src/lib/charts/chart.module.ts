import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { UiModule } from '../ui/ui.module';
import { GanttChartComponent } from './components/gantt-chart/gantt-chart.component';
import { ChartsConfig } from './config/charts-config';
import { CHARTS_CONFIG } from './config/charts-config.contants';
import { GanttSeriesTooltipTemplateDirective } from './directives/gantt-templates.directive';

export { GanttItemModel, GanttSerieModel } from './components/gantt-chart/models/gantt-item.model';
export { ChartsConfig } from './config/charts-config';
export { GanttChartComponent } from './components/gantt-chart/gantt-chart.component';

@NgModule({
    imports: [
        CommonModule,
        UiModule,
    ],
    declarations: [        
        GanttChartComponent,
        GanttSeriesTooltipTemplateDirective
    ],
    exports: [
        GanttChartComponent,
        GanttSeriesTooltipTemplateDirective
    ],
    providers: [],
})
export class NgxUiHeroChartsModule {
    static forRoot(config: ChartsConfig): ModuleWithProviders {
        return {
            ngModule: NgxUiHeroChartsModule,
            providers: [
                {
                    provide: CHARTS_CONFIG,
                    useValue: config,
                }
            ]
        };
    }
}
