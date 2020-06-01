import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginDialogModule } from '../layout/header/login-dialog.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HomeComponent],
    exports: [HomeComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatGridListModule,
        MatButtonModule,
        LoginDialogModule,
        RouterModule,
        MatIconModule,
    ],
})
export class HomeModule {}
