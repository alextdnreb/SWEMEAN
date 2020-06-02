import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { CommonModule } from '@angular/common';
import { DetailsGeburtsdatumComponent } from './details-geburtsdatum.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsGeburtsdatumComponent],
    exports: [DetailsGeburtsdatumComponent],
    imports: [
        MatDatepickerModule,
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatNativeDateModule,
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'de' }],
})
export class DetailsGeburtsdatumModule {}
