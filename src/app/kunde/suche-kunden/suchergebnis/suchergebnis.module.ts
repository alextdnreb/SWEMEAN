import { CommonModule } from '@angular/common';
import { ErrorMessageModule } from '../../../shared/error-message.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuchergebnisComponent } from './suchergebnis.component';
import { WaitingModule } from '../../../shared/waiting.module';

@NgModule({
    declarations: [SuchergebnisComponent],
    exports: [SuchergebnisComponent],
    imports: [
        CommonModule,
        RouterModule,
        ErrorMessageModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        WaitingModule,
        MatTableModule,
    ],
})
export class SuchergebnisModule {}
