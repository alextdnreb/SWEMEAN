import { CommonModule } from '@angular/common';
import { DetailsNewsletterComponent } from './details-newsletter.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsNewsletterComponent],
    exports: [DetailsNewsletterComponent],
    imports: [MatSlideToggleModule, ReactiveFormsModule, CommonModule],
})
export class DetailsNewsletterModule {}
