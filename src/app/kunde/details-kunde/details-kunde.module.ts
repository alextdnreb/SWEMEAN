import { DetailsKundeBildModule } from './details-kunde-bild.module';
import { DetailsKundeComponent } from './details-kunde.component';
import { DetailsKundeFormModule } from './details-kunde-form.module';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsKundeComponent],
    exports: [DetailsKundeComponent],
    imports: [DetailsKundeFormModule, MatTabsModule, DetailsKundeBildModule],
})
export class DetailsKundeModule {}
