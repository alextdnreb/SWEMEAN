import { HttpClientModule } from '@angular/common/http';
import { LiniendiagrammComponent } from './liniendiagramm.component';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [LiniendiagrammComponent],
    exports: [LiniendiagrammComponent],
    imports: [HttpClientModule],
    providers: [Title],
})
export class LiniendiagrammModule {}
