import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TortendiagrammComponent } from './tortendiagramm.component';

@NgModule({
    declarations: [TortendiagrammComponent],
    exports: [TortendiagrammComponent],
    imports: [HttpClientModule],
    providers: [Title],
})
export class TortendiagrammModule {}
