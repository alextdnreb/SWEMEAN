import { CommonModule } from '@angular/common';
import { DetailsOrtComponent } from './details-ort.component';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsOrtComponent],
    exports: [DetailsOrtComponent],
    imports: [MatInputModule, CommonModule, ReactiveFormsModule],
})
export class DetailsOrtModule {}
