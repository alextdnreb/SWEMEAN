import { CommonModule } from '@angular/common';
import { DetailsStammkundeComponent } from './details-stammkunde.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsStammkundeComponent],
    exports: [DetailsStammkundeComponent],
    imports: [CommonModule],
})
export class DetailsStammkundeModule {}
