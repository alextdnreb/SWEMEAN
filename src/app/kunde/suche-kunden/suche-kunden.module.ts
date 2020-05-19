import { NgModule } from '@angular/core';
import { SucheKundenComponent } from './suche-kunden.component';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [SucheKundenComponent],
    exports: [SucheKundenComponent],
    imports: [],
    providers: [Title],
})
export class SucheKundenModule {}
