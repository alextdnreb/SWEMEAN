import { CommonModule } from '@angular/common';
import { DetailsNachnameComponent } from './details-nachname.component';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsNachnameComponent],
    exports: [DetailsNachnameComponent],
    imports: [MatInputModule, CommonModule, ReactiveFormsModule],
})
export class DetailsNachnameModule {}
