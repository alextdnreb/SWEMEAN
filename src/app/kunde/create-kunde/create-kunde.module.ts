import { CommonModule } from '@angular/common';
import { CreateKundeComponent } from './create-kunde.component';
import { CreatePasswordModule } from './formfields/create-password.module';
import { CreateUsernameModule } from './formfields/create-username.module';
import { DetailsBetragModule } from '../details-kunde/formfields/details-betrag.module';
import { DetailsEmailModule } from '../details-kunde/formfields/details-email.module';
import { DetailsFamilienstandModule } from '../details-kunde/formfields/details-familienstand.module';
import { DetailsGeburtsdatumModule } from '../details-kunde/formfields/details-geburtsdatum.module';
import { DetailsGeschlechtModule } from '../details-kunde/formfields/details-geschlecht.module';
import { DetailsHomepageModule } from '../details-kunde/formfields/details-homepage.module';
import { DetailsInteressenModule } from '../details-kunde/formfields/details-interessen.module';
import { DetailsKategorieModule } from '../details-kunde/formfields/details-kategorie.module';
import { DetailsNachnameModule } from '../details-kunde/formfields/details-nachname.module';
import { DetailsNewsletterModule } from '../details-kunde/formfields/details-newsletter.module';
import { DetailsOrtModule } from '../details-kunde/formfields/details-ort.module';
import { DetailsPlzModule } from '../details-kunde/formfields/details-plz.module';
import { DetailsWaehrungModule } from '../details-kunde/formfields/details-waehrung.module';
import { ErrorMessageModule } from '../../shared/error-message.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [CreateKundeComponent],
    exports: [CreateKundeComponent],
    imports: [
        MatSnackBarModule,
        FormsModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatCardModule,
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
        CreateUsernameModule,
        CreatePasswordModule,
        DetailsInteressenModule,
        MatProgressBarModule,
    ],
    providers: [Title],
})
export class CreateKundeModule {}
