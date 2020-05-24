import { CommonModule } from '@angular/common';
import { DetailsUmsatzComponent } from './details-umsatz.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsUmsatzComponent],
    exports: [DetailsUmsatzComponent],
    imports: [CommonModule],
})
export class DetailsUmsatzModule {}
