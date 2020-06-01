import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../auth/admin.guard';
import { BalkendiagrammComponent } from './diagramme/balkendiagramm.component';
import { CreateKundeComponent } from './create-kunde/create-kunde.component';
import { DetailsKundeComponent } from './details-kunde/details-kunde.component';
import { LiniendiagrammComponent } from './diagramme/liniendiagramm.component';
import { NgModule } from '@angular/core';
import { SucheKundenComponent } from './suche-kunden/suche-kunden.component';
import { TortendiagrammComponent } from './diagramme/tortendiagramm.component';
import { UpdateKundeComponent } from './update-kunde/update-kunde.component';

// Route-Definitionen fuer das Feature-Modul "buch":
// Zuordnung von Pfaden und Komponenten mit HTML-Templates
const routes: Routes = [
    {
        path: 'suche',
        component: SucheKundenComponent,
    },
    { path: 'create', component: CreateKundeComponent },
    {
        path: 'balkendiagramm',
        component: BalkendiagrammComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'liniendiagramm',
        component: LiniendiagrammComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'tortendiagramm',
        component: TortendiagrammComponent,
        canActivate: [AdminGuard],
    },
    {
        path: ':id',
        component: DetailsKundeComponent,
        canActivate: [AdminGuard],
    },
    {
        path: ':id/update',
        component: UpdateKundeComponent,
        canActivate: [AdminGuard],
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class KundeRoutingModule {}
