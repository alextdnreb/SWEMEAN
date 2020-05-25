import { CommonModule } from '@angular/common';
import { CreatePasswortComponent } from './create-passwort.component';
// import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreatePasswortComponent],
    exports: [CreatePasswortComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class CreatePasswortModule {}
