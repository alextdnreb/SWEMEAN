import { CommonModule } from '@angular/common';
import { CreateGeburtsdatumComponent } from './create-geburtsdatum.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [CreateGeburtsdatumComponent],
    exports: [CreateGeburtsdatumComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class CreateGeburtsdatumModule {}
