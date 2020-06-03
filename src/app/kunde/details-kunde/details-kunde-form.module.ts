import { CommonModule } from '@angular/common';
import { DetailsBetragModule } from './formfields/details-betrag.module';
import { DetailsEmailModule } from './formfields/details-email.module';
import { DetailsFamilienstandModule } from './formfields/details-familienstand.module';
import { DetailsGeburtsdatumModule } from './formfields/details-geburtsdatum.module';
import { DetailsGeschlechtModule } from './formfields/details-geschlecht.module';
import { DetailsHomepageModule } from './formfields/details-homepage.module';
import { DetailsInteressenModule } from './formfields/details-interessen.module';
import { DetailsKategorieModule } from './formfields/details-kategorie.module';
import { DetailsKundeFormComponent } from './details-kunde-form.component';
import { DetailsNachnameModule } from './formfields/details-nachname.module';
import { DetailsNewsletterModule } from './formfields/details-newsletter.module';
import { DetailsOrtModule } from './formfields/details-ort.module';
import { DetailsPlzModule } from './formfields/details-plz.module';
import { DetailsWaehrungModule } from './formfields/details-waehrung.module';
import { ErrorMessageModule } from '../../shared/error-message.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WaitingModule } from '../../shared/waiting.module';

@NgModule({
    declarations: [DetailsKundeFormComponent],
    exports: [DetailsKundeFormComponent],
    imports: [
        FormsModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatCardModule,
        WaitingModule,
        ErrorMessageModule,
        HttpClientModule,
        MatInputModule,
        CommonModule,
        DetailsNachnameModule,
        DetailsGeschlechtModule,
        DetailsEmailModule,
        DetailsKategorieModule,
        DetailsNewsletterModule,
        DetailsGeburtsdatumModule,
        DetailsInteressenModule,
        DetailsFamilienstandModule,
        DetailsHomepageModule,
        DetailsWaehrungModule,
        DetailsBetragModule,
        DetailsOrtModule,
        DetailsPlzModule,
        MatProgressBarModule,
    ],
    providers: [Title],
})
export class DetailsKundeFormModule {}
