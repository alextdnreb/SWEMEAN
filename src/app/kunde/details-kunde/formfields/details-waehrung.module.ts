import { CommonModule } from '@angular/common';
import { DetailsWaehrungComponent } from './details-waehrung.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsWaehrungComponent],
    exports: [DetailsWaehrungComponent],
    imports: [
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
        MatSelectModule,
    ],
})
export class DetailsWaehrungModule {}
