import { CommonModule } from '@angular/common';
import { CreateUsernameComponent } from './create-username.component';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateUsernameComponent],
    exports: [CreateUsernameComponent],
    imports: [MatInputModule, CommonModule, ReactiveFormsModule],
})
export class CreateUsernameModule {}
