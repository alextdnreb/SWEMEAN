import { CommonModule } from '@angular/common';
import { DetailsPlzComponent } from './details-plz.component';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsPlzComponent],
    exports: [DetailsPlzComponent],
    imports: [MatInputModule, CommonModule, ReactiveFormsModule],
})
export class DetailsPlzModule {}
