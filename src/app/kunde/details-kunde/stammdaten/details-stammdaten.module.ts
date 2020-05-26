import { CommonModule } from '@angular/common';
import { DetailsEmailModule } from './details-email.module';
import { DetailsFamilienstandModule } from './details-familienstand.module';
import { DetailsGeburtsdatumModule } from './details-geburtsdatum.module';
import { DetailsGeschlechtModule } from './details-geschlecht.module';
import { DetailsHomepageModule } from './details-homepage.module';
import { DetailsKategorieModule } from './details-kategorie.module';
import { DetailsNachnameModule } from './details-nachname.module';
import { DetailsNewsletterModule } from './details-newsletter.module';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { DetailsUmsatzModule } from './details-umsatz.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsStammdatenComponent],
    exports: [DetailsStammdatenComponent],
    imports: [
        CommonModule,
        DetailsGeburtsdatumModule,
        DetailsNachnameModule,
        DetailsKategorieModule,
        DetailsUmsatzModule,
        DetailsGeschlechtModule,
        DetailsEmailModule,
        DetailsFamilienstandModule,
        DetailsHomepageModule,
        DetailsNewsletterModule,
    ],
})
export class DetailsStammdatenModule {}
