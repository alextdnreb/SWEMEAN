import { CommonModule } from '@angular/common';
import { DetailsHomepageComponent } from './details-homepage.component';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsHomepageComponent],
    exports: [DetailsHomepageComponent],
    imports: [MatInputModule, CommonModule, ReactiveFormsModule],
})
export class DetailsHomepageModule {}
