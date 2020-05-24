import { CommonModule } from '@angular/common';
import { DetailsEmailModule } from './details-email.module';
import { DetailsGeburtsdatumModule } from './details-geburtsdatum.module';
import { DetailsGeschlechtModule } from './details-geschlecht.module';
import { DetailsNachnameModule } from './details-nachname.module';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { DetailsStammkundeModule } from './details-stammkunde.module';
import { DetailsUmsatzModule } from './details-umsatz.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsStammdatenComponent],
    exports: [DetailsStammdatenComponent],
    imports: [
        CommonModule,
        DetailsGeburtsdatumModule,
        DetailsNachnameModule,
        DetailsStammkundeModule,
        DetailsUmsatzModule,
        DetailsGeschlechtModule,
        DetailsEmailModule,
    ],
})
export class DetailsStammdatenModule {}
