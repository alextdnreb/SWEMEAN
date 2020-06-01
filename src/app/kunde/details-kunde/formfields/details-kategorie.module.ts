import { CommonModule } from '@angular/common';
import { DetailsKategorieComponent } from './details-kategorie.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsKategorieComponent],
    exports: [DetailsKategorieComponent],
    imports: [
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
        MatSelectModule,
    ],
})
export class DetailsKategorieModule {}
