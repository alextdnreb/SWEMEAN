// Direktiven (z.B. ngFor, ngIf) und Pipes
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginDialogComponent } from './login-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [LoginDialogComponent],
    exports: [LoginDialogComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
    ],
})
export class LoginDialogModule {}
