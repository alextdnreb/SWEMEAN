import { CommonModule } from '@angular/common';
import { LoginLogoutModule } from './login-logout.module';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './nav.component';
import { NavSearchModule } from './nav-search.module';
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
        NavSearchModule,
    ],
})
export class NavModule {}
