import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WindowControlsComponent } from './window-controls.component';

// single component module

@NgModule({
    declarations: [WindowControlsComponent],
    exports: [WindowControlsComponent],
    imports: [CommonModule],
})
export class WindowControlsModule {}
