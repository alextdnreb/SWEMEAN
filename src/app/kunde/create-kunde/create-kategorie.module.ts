import { CreateKategorieComponent } from './create-kategorie.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateKategorieComponent],
    exports: [CreateKategorieComponent],
    imports: [ReactiveFormsModule],
})
export class CreateKategorieModule {}
