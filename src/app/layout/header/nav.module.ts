import { CommonModule } from '@angular/common';
import { LoginLogoutModule } from './login-logout.module';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './nav.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WindowControlsModule } from './window-controls.module';

@NgModule({
    declarations: [NavComponent],
    exports: [NavComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatMenuModule,
        LoginLogoutModule,
        WindowControlsModule,
    ],
})
export class NavModule {}
