import { CommonModule } from '@angular/common';
import { LoginLogoutModule } from './login-logout.module';
import { NavComponent } from './nav.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [NavComponent],
    exports: [NavComponent],
    imports: [CommonModule, RouterModule, LoginLogoutModule],
})
export class NavModule {}
