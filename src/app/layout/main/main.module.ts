import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [MainComponent],
    exports: [MainComponent],
    // fuer router-outlet
    imports: [RouterModule],
})
export class MainModule {}
