import { CommonModule } from '@angular/common';
import { DetailsEmailComponent } from './details-email.component';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsEmailComponent],
    exports: [DetailsEmailComponent],
    imports: [MatInputModule, CommonModule, ReactiveFormsModule],
})
export class DetailsEmailModule {}
