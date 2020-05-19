import { CreateKundeComponent } from './create-kunde.component';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [CreateKundeComponent],
    exports: [CreateKundeComponent],
    imports: [],
    providers: [Title],
})
export class CreateKundeModule {}
