import { CommonModule } from '@angular/common';
import { DetailsBetragComponent } from './details-betrag.component';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsBetragComponent],
    exports: [DetailsBetragComponent],
    imports: [MatInputModule, CommonModule, ReactiveFormsModule],
})
export class DetailsBetragModule {}
