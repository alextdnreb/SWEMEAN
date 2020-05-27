import { CommonModule } from '@angular/common';
import { DetailsEmailModule } from './formfields/details-email.module';
import { DetailsFamilienstandModule } from './formfields/details-familienstand.module';
import { DetailsGeburtsdatumModule } from './formfields/details-geburtsdatum.module';
import { DetailsGeschlechtModule } from './formfields/details-geschlecht.module';
import { DetailsInteressenModule } from './formfields/details-interessen.module';
import { DetailsKategorieModule } from './formfields/details-kategorie.module';
import { DetailsKundeComponent } from './details-kunde.component';
import { DetailsNachnameModule } from './formfields/details-nachname.module';
import { DetailsNewsletterModule } from './formfields/details-newsletter.module';
import { ErrorMessageModule } from '../../shared/error-message.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WaitingModule } from '../../shared/waiting.module';

@NgModule({
    declarations: [DetailsKundeComponent],
    exports: [DetailsKundeComponent],
    imports: [
        WaitingModule,
        ErrorMessageModule,
        HttpClientModule,
        CommonModule,
        DetailsNachnameModule,
        DetailsGeschlechtModule,
        DetailsEmailModule,
        DetailsKategorieModule,
        DetailsNewsletterModule,
        DetailsGeburtsdatumModule,
        DetailsInteressenModule,
        DetailsFamilienstandModule,
    ],
    providers: [Title],
})
export class DetailsKundeModule {}
