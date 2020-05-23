import { CommonModule } from '@angular/common';
import { NavSearchComponent } from './nav-search.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [NavSearchComponent],
    exports: [NavSearchComponent],
    imports: [CommonModule],
})
export class NavSearchModule {}
