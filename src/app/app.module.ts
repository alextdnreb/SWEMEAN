import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './layout/header/header.module';
import { HomeModule } from './home/home.module';
import { KundeModule } from './kunde/kunde.module';
import { MainModule } from './layout/main/main.module';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// https://angular.io/docs/ts/latest/guide/ngmodule.html
// https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html
// http://blog.angular-university.io/angular2-ngmodule

// "Application Root Module" (= Einstiegsmodul):
// Der Name ist per Konvention bzw. ng-cli "AppModule"
// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet
@NgModule({
    // Eigene Komponenten des Moduls
    // Jede nutzbare Komponente muss in genau 1 Modul deklariert sein
    declarations: [
        // Eigentliche Komponente
        AppComponent,
    ],

    // Von den importierten Modulen sind alle exportierten Komponenten nutzbar
    // Ein Modul muss die Module importieren, von denen es Funktionalitaet nutzt
    imports: [
        /* eslint-disable object-curly-newline */

        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        /* eslint-enable object-curly-newline */

        // BrowserAnimationsModule importiert BrowserModul
        BrowserAnimationsModule,

        AppRoutingModule,
        KundeModule,
        HomeModule,
        HeaderModule,
        MainModule,
    ],
    // Nur das Rootmodul hat die Property "bootstrap", um die
    // Einstiegskomponente zu deklarieren
    // https://angular.io/guide/entry-components
    // https://blog.angularindepth.com/how-to-manually-bootstrap-an-angular-application-9a36ccf86429
    bootstrap: [AppComponent],
})
export class AppModule {}
