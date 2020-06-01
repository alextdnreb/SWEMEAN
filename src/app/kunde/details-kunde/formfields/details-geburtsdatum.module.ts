import { CommonModule } from '@angular/common';
import { DetailsGeburtsdatumComponent } from './details-geburtsdatum.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
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
})
export class DetailsGeburtsdatumModule {}
