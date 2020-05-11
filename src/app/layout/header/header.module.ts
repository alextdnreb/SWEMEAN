import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavModule } from './nav.module';
import { NgModule } from '@angular/core';

// single component module

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [NavModule, MatToolbarModule],
})
export class HeaderModule {}
