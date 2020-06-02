import { CommonModule } from '@angular/common';
import { DetailsKundeBildComponent } from './details-kunde-bild.component';
import { ErrorMessageModule } from '../../shared/error-message.module';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { WaitingModule } from '../../shared/waiting.module';

@NgModule({
    declarations: [DetailsKundeBildComponent],
    exports: [DetailsKundeBildComponent],
    imports: [
        MatSnackBarModule,
        CommonModule,
        MatCardModule,
        ErrorMessageModule,
        WaitingModule,
    ],
})
export class DetailsKundeBildModule {}
