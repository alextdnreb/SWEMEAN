import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../auth/admin.guard';
import { CreateKundeComponent } from './create-kunde/create-kunde.component';
import { DetailsKundeComponent } from './details-kunde/details-kunde.component';
import { NgModule } from '@angular/core';
import { SucheKundenComponent } from './suche-kunden/suche-kunden.component';
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
