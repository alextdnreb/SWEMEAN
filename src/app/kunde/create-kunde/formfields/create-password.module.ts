import { CommonModule } from '@angular/common';
import { CreatePasswordComponent } from './create-password.component';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreatePasswordComponent],
    exports: [CreatePasswordComponent],
    imports: [MatInputModule, CommonModule, ReactiveFormsModule],
})
export class CreatePasswordModule {}
