import { CreateHomepageComponent } from './create-homepage.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateHomepageComponent],
    exports: [CreateHomepageComponent],
    imports: [ReactiveFormsModule],
})
export class CreateHomepageModule {}
