import { CommonModule } from '@angular/common';
import { DetailsInteressenComponent } from './details-interessen.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsInteressenComponent],
    exports: [DetailsInteressenComponent],
    imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule],
})
export class DetailsInteressenModule {}
