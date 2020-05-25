/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy oSf the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SucheEmailComponent } from './suche-email.component';
import { SucheInteressenComponent } from './suche-interessen.component';
import { SucheKategorieComponent } from './suche-kategorie.component';
import { SucheNachnameComponent } from './suche-nachname.component';
import type { Suchkriterien } from '../../shared/kunde.service';
import { fadeIn } from '../../../shared/animations';

/**
 * Komponente f&uuml;r das Tag <code>swe-suchformular</code>
 */
@Component({
    selector: 'swe-suchformular',
    templateUrl: './suchformular.component.html',
    animations: [fadeIn],
})
export class SuchformularComponent {
    // Event Binding: <hs-suchformular (waiting)="...">
    // in RxJS: Observables = Event-Streaming mit Promises
    // Subject statt der Basisklasse Observable, damit next() in onFind() aufgerufen werden kann
    // https://angular.io/guide/component-interaction#parent-listens-for-child-event
    @Output()
    readonly suchkriterien = new Subject<Suchkriterien>();

    // DI der Child-Komponente, um auf deren Attribut (hier: "titel") zuzugreifen
    // @Output in SucheTitelComponent wuerde Subject<> erfordern
    // https://angular.io/guide/component-interaction#parent-calls-an-viewchild
    // query results available in ngOnInit

    @ViewChild(SucheNachnameComponent, { static: true })
    private readonly sucheNachnameComponent!: SucheNachnameComponent;

    @ViewChild(SucheEmailComponent, { static: true })
    private readonly sucheEmailComponent!: SucheEmailComponent;

    @ViewChild(SucheInteressenComponent, { static: true })
    private readonly sucheInteressenComponent!: SucheInteressenComponent;

    @ViewChild(SucheKategorieComponent, { static: true })
    private readonly sucheKategorieComponent!: SucheKategorieComponent;

    // DI: Constructor Injection (React hat uebrigens keine DI)
    // Empfehlung: Konstruktor nur fuer DI
    constructor() {
        console.log('SuchformularComponent.constructor()');
    }

    /**
     * Suche nach B&uuml;chern, die den spezfizierten Suchkriterien entsprechen
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onFind() {
        const { nachname } = this.sucheNachnameComponent;
        const { email } = this.sucheEmailComponent;
        const { reisen } = this.sucheInteressenComponent;
        const { lesen } = this.sucheInteressenComponent;
        const { sport } = this.sucheInteressenComponent;
        const { kategorie } = this.sucheKategorieComponent;
        console.log(
            `SuchformularComponent.onFind(): nachname=${nachname}, email=${email}, reisen=${reisen}, lesen=${lesen}, sport=${sport} kategorie=${kategorie}`,
        );

        console.log('SuchformularComponent.onFind(): do');
        if (email.length === 0) {
            this.suchkriterien.next({
                nachname,
                interessen: { reisen, lesen, sport },
                kategorie,
            });
        } else {
            this.suchkriterien.next({
                nachname,
                email,
                interessen: { reisen, lesen, sport },
                kategorie,
            });
        }

        console.log('SuchformularComponent.onFind(): done');

        // Inspektion der Komponente mit dem Tag-Namen "app" im Debugger
        // Voraussetzung: globale Variable ng deklarieren (s.o.)
        // const app = document.querySelector('app')
        // global.ng.probe(app)

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite.
        return false;
    }
}
