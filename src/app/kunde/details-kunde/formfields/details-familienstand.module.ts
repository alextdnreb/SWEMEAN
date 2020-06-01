import { CommonModule } from '@angular/common';
import { DetailsFamilienstandComponent } from './details-familienstand.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsFamilienstandComponent],
    exports: [DetailsFamilienstandComponent],
    imports: [CommonModule, MatRadioModule, ReactiveFormsModule],
})
export class DetailsFamilienstandModule {}
