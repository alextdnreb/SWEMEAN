
import { CommonModule } from '@angular/common';
import { DetailsBewertungModule } from './details-bewertung.module';
import { DetailsDatumModule } from './details-datum.module';
import { DetailsKundennummerModule } from './details-kundennummer.module';
import { DetailsNameModule } from './details-name.module';
import { DetailsSkontoModule } from './details-skonto.module';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { DetailsStammkundeModule } from './details-stammkunde.module';
import { DetailsTitelModule } from './details-titel.module';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [DetailsStammdatenComponent],
    exports: [DetailsStammdatenComponent],
    imports: [
        CommonModule,
        DetailsBewertungModule,
        DetailsDatumModule,
        DetailsKundennummerModule,
        DetailsStammkundeModule,
        DetailsSkontoModule,
        DetailsTitelModule,
        DetailsNameModule,
    ],
})
export class DetailsStammdatenModule {}
