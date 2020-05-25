import { CommonModule } from '@angular/common';
import { CreateFamilienstandComponent } from './create-familienstand.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [CreateFamilienstandComponent],
    exports: [CreateFamilienstandComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class CreateFamilienstandModule {}
