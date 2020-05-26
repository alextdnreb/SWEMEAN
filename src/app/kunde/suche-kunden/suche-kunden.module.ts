import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { SucheKundenComponent } from './suche-kunden.component';
import { SuchergebnisModule } from './suchergebnis/suchergebnis.module';
import { SuchformularModule } from './suchformular/suchformular.module';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [SucheKundenComponent],
    exports: [SucheKundenComponent],
    imports: [
        SuchergebnisModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        SuchformularModule,
    ],
    providers: [Title],
})
export class SucheKundenModule {}
