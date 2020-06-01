import { BalkendiagrammComponent } from './balkendiagramm.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [BalkendiagrammComponent],
    exports: [BalkendiagrammComponent],
    imports: [HttpClientModule],
    providers: [Title],
})
export class BalkendiagrammModule {}
