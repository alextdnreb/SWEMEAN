import { NgModule } from '@angular/core';
import { UpdateKundeComponent } from './create-kunde.component';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [UpdateKundeComponent],
    exports: [UpdateKundeComponent],
    imports: [],
    providers: [Title],
})
export class UpdateKundeModlue {}
