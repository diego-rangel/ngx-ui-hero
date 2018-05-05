import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'getting-started',
        loadChildren: 'app/getting-started/getting-started.module#GettingStartedModule'
    },
    {
        path: 'components',
        loadChildren: 'app/components/components.module#ComponentsModule'
    },
    {
        path: 'services',
        loadChildren: 'app/services/services.module#ServicesModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
