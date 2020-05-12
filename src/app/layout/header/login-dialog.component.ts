import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Credentials {
    username: string;
    password: string;
}

@Component({
    selector: 'swe-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<LoginDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Credentials,
    ) {
        console.log('LoginComponent.constructor()');
    }

    onSubmit(): void {
        this.dialogRef.close(this.data);
    }
}
