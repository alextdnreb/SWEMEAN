import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UpdateKundeComponent } from './update-kunde.component';

@NgModule({
    declarations: [UpdateKundeComponent],
    exports: [UpdateKundeComponent],
    imports: [],
    providers: [Title],
})
export class UpdateKundeModule {}
