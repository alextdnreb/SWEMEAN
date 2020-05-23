import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavSearchComponent } from './nav-search.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [NavSearchComponent],
    exports: [NavSearchComponent],
    imports: [CommonModule, FormsModule],
})
export class NavSearchModule {}
