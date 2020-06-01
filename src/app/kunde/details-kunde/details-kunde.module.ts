import { DetailsKundeComponent } from './details-kunde.component';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [DetailsKundeComponent],
    exports: [DetailsKundeComponent],
    imports: [],
    providers: [Title],
})
export class DetailsKundeModule {}
