import { CreateNewsletterComponent } from './create-newsletter.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateNewsletterComponent],
    exports: [CreateNewsletterComponent],
    imports: [ReactiveFormsModule],
})
export class CreateNewsletterModule {}
