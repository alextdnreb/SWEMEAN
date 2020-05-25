import { CommonModule } from '@angular/common';
import { CreateGeschlechtComponent } from './create-geschlecht.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateGeschlechtComponent],
    exports: [CreateGeschlechtComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class CreateGeschlechtModule {}
