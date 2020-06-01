import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './nav.component';
import { LoginLogoutModule } from './login-logout.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [NavComponent],
    exports: [NavComponent],
    imports: [CommonModule, RouterModule, MatMenuModule, LoginLogoutModule],
})
export class NavModule {}
