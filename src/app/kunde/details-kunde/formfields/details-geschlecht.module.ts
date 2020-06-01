import { CommonModule } from '@angular/common';
import { DetailsGeschlechtComponent } from './details-geschlecht.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsGeschlechtComponent],
    exports: [DetailsGeschlechtComponent],
    imports: [CommonModule, MatRadioModule, ReactiveFormsModule],
})
export class DetailsGeschlechtModule {}
